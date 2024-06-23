import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

import { CreateUsuarioDto } from './usuarios/dto/create-usuario.dto';
import { UsuariosService } from './usuarios/usuarios.service';
import { Usuario } from './usuarios/schema/usuario.schema';


@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsuariosService, // Certifique-se de que o nome da variável está correto
    private readonly jwtService: JwtService,
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>
  ) { }
  
  async login(loginInfo: { username?: string; email?: string }, senha: string): Promise<any> {
    try {
      const user = loginInfo.username
        ? await this.usersService.findOneByUsername(loginInfo.username)
        : await this.usersService.findOneByEmail(loginInfo.email);
      
      if (!user || user.senha !== senha) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      const { senha: _, ...result } = user;
      const payload = { username: user.username };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw new UnauthorizedException('Credenciais inválidas');
    }
  }

  async register(createUsuarioDto: CreateUsuarioDto): Promise<any> {
    try {
      // Verifique se o email já existe
      const existingEmail = await this.usersService.existeEmail(createUsuarioDto.email);
      if (existingEmail) {
        throw new BadRequestException('Usuário já existe (Email)');
      }   
      
      // Verifique se o uusername já existe
      const existingUsername = await this.usersService.existeUsername(createUsuarioDto.username);
      if (existingUsername) {
        throw new BadRequestException('Usuário já existe (Username)');
      }

      // Crie um novo usuário
      const userCreated = await this.usersService.create(createUsuarioDto);
      const { senha, ...userData } = userCreated;

      return userData;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw new BadRequestException('Erro ao criar usuário');
    }
  }
  
  async verifyToken(token: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
      return true;
    } catch (err) {
      console.error('Erro ao verificar token:', err);
      return false;
    }
  }
}
