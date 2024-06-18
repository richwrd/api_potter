import { Controller, Get, Post, Put, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharactersDto, UpdateCharactersDto } from './dto/create-character.dto';
import { Characters } from './schemas/characters.schema';

@Controller('characters')
export class CharactersController {
  constructor(private readonly characterService: CharactersService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createCharactersDto: CreateCharactersDto): Promise<Characters> {
    try {
      return await this.characterService.create(createCharactersDto);
    } catch (error) {
      throw new HttpException('Erro ao criar o personagem', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll(): Promise<Characters[]> {
    try {
      return await this.characterService.findAll();
    } catch (error) {
      throw new HttpException('Erro ao buscar os personagens', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<Characters> {
    try {
      return await this.characterService.findOne(id);
    } catch (error) {
      throw new HttpException('Personagem não encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: string, @Body(new ValidationPipe()) updateCharactersDto: UpdateCharactersDto): Promise<Characters> {
    try {
      return await this.characterService.update(id, updateCharactersDto);
    } catch (error) {
      throw new HttpException('Erro ao atualizar o personagem', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string): Promise<Characters> {
    try {
      return await this.characterService.remove(id);
    } catch (error) {
      throw new HttpException('Erro ao excluir o personagem', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Get('fetch/json')
  async fetchAndSaveAllCharacters(): Promise<void> {
    try {
      return await this.characterService.fetchAndSaveAllCharacters();
    } catch (error) {
      // Trate o erro de forma apropriada, por exemplo, lançando uma exceção ou retornando uma resposta HTTP adequada
      throw new HttpException('Erro ao buscar os personagens da API da Marvel', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
}
