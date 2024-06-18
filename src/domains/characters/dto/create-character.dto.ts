import { IsOptional, IsString, IsInt, IsArray, Validate, IsBoolean } from 'class-validator';

export class CreateCharactersDto {
  @IsInt()
  id: number;

  @IsString()
  nome: string;

  @IsInt()
  idade: number;

  @IsString()
  casa: string;

  @IsOptional() // Tornando o campo opcional
  @IsString()
  thumbnail: string;

  @IsOptional() // Tornando o campo opcional
  @IsArray()
  @IsString({ each: true }) // Cada item do array deve ser uma string
  comics: string[];

  @IsString()
  patrono: string;

  @IsBoolean()
  estuda_hogwarts: boolean;
}

export class UpdateCharactersDto {
  @IsOptional() // O campo é opcional, pois é um DTO de atualização
  @IsInt()
  id: number;

  @IsOptional() // O campo é opcional, pois é um DTO de atualização
  @IsString()
  name: string;

  @IsOptional() // O campo é opcional, pois é um DTO de atualização
  @IsString()
  description: string;

  @IsOptional() // O campo é opcional, pois é um DTO de atualização
  @IsString()
  thumbnail: string;

  @IsOptional() // O campo é opcional, pois é um DTO de atualização
  @IsArray()
  @IsString({ each: true }) // Cada item do array deve ser uma string
  series: string[];
}
