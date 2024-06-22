import { IsOptional, IsString, IsInt, IsArray, Validate, IsBoolean } from 'class-validator';

export class CreatePersonagemDto {
  @IsString()
  id: string;

  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  image: string;
}


export class UpdatePersonagemDto {
  @IsOptional()  // O campo é opcional, pois é um DTO de atualização
  @IsString()
  nome: string;

  @IsOptional() 
  @IsString()
  imagem: string;

}
