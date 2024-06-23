import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request, HttpException, ValidationPipe, Req, Res, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from './usuarios/dto/create-usuario.dto';
import { Public } from './constants';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp(@Body() createUsuarioDto: CreateUsuarioDto): Promise<any> {
    try {
      console.log(createUsuarioDto);
      return await this.authService.register(createUsuarioDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: { senha: string; username?: string; email?: string }): Promise<any> {
    try {
      const loginInfo = signInDto.username ? { username: signInDto.username } : { email: signInDto.email };

      return await this.authService.login(loginInfo, signInDto.senha);
    } catch (error) {
      throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verifyToken(@Headers('authorization') authHeader: string) {
    const token = this.extractTokenFromHeader(authHeader);
    if (!token) {
      throw new HttpException({ status: 'Token não fornecido' }, HttpStatus.UNAUTHORIZED);
    }
    const isValid = await this.authService.verifyToken(token);
    if (isValid) {
      return { status: 'Token válido' };
    } else {
      throw new HttpException({ status: 'Token inválido' }, HttpStatus.UNAUTHORIZED);
    }
  }

  private extractTokenFromHeader(authHeader: string): string | null {
    if (!authHeader) {
      return null;
    }
    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1];
    }
    return null;
  }
}
