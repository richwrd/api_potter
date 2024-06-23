import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsNotEmpty, IsString, IsNumber, IsUrl } from 'class-validator';

export type PersonagemDocument = HydratedDocument<Personagem>;

@Schema()
export class Personagem {

  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsString()
  id: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  nome: string; 
  
  @Prop()
  @IsNotEmpty()
  @IsUrl()
  imagem: string;
  
}

export const PersonagemSchema = SchemaFactory.createForClass(Personagem);