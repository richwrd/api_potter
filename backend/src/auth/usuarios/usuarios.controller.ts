import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';

import { Usuario } from './schema/usuario.schema';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      return await this.usuariosService.create(createUsuarioDto);
    } catch (error) {
      throw new HttpException('Erro ao criar o usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('all')
  async findAll(): Promise<Usuario[]> {
    try {
      const admin = true;
      return await this.usuariosService.findAll(admin);
    } catch (error) {
      throw new HttpException('Erro ao buscar os usuários', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('username/:username')
  async findOneByUsername(@Param('username') username: string): Promise<Usuario> {
    try {
      return await this.usuariosService.findOneByUsername(username);
    } catch (error) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string): Promise<Usuario> {
    try {
      return await this.usuariosService.findOneByEmail(email);
    } catch (error) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    try {
      return await this.usuariosService.update(id, updateUsuarioDto);
    } catch (error) {
      throw new HttpException('Erro ao atualizar o usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Usuario> {
    try {
      return await this.usuariosService.remove(id);
    } catch (error) {
      throw new HttpException('Erro ao excluir o usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
