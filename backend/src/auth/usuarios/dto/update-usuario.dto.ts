import { IsString, IsEmail, MinLength, IsOptional, IsEnum } from 'class-validator';

import { TipoUsuario } from '../enums/tipo-usuario.enum';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsEmail()
  email: string;
  
  @IsOptional()
  @IsString()
  @MinLength(6)
  username: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  senha: string;

  @IsOptional()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  imagem: string;

  @IsOptional()
  @IsEnum(TipoUsuario)
  tipo: TipoUsuario;
}