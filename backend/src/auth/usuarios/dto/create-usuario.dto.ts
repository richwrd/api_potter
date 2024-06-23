import { IsString, IsEmail, MinLength, IsOptional, IsEnum, IsNumber, IsNotEmpty } from 'class-validator';

import { TipoUsuario } from '../enums/tipo-usuario.enum';

export class CreateUsuarioDto {
  
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;


  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  senha: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  imagem: string;

  @IsNotEmpty()
  @IsEnum(TipoUsuario)
  tipo: TipoUsuario;
}
