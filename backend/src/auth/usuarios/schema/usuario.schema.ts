import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsNotEmpty, IsString, IsEmail, MinLength, IsUrl, IsEnum, IsNumber } from 'class-validator';

import { TipoUsuario } from '../enums/tipo-usuario.enum';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
export class Usuario {
  
  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  username: string;
  
  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  senha: string;


  @Prop()
  @IsNotEmpty()
  @IsString()
  nome: string; 

  @Prop()
  @IsUrl()
  imagem: string;
  
  @Prop({ required: true, enum: TipoUsuario })
  @IsNotEmpty()
  @IsEnum(TipoUsuario)
  tipo: TipoUsuario;
}
export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
