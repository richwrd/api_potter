import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { PersonagensService } from './personagens.service';
import { CreatePersonagemDto, UpdatePersonagemDto } from './dto/create-personagem.dto';
import { Personagem } from './schema/personagem.schema';

@Controller('personagens')
export class PersonagensController {
  constructor(private readonly personagensService: PersonagensService) {}


  @Get('dump')
  async APIbuscarESalvarPersongens() {
    try{
      return await this.personagensService.fetchAndSaveAllPersonagens();
    } catch (error) {
      throw new HttpException('Erro ao SALVAR os personagens', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Body() createPersonagemDto: CreatePersonagemDto): Promise<Personagem> {
    try{
      return await this.personagensService.create(createPersonagemDto);
    } catch (error) {
      throw new HttpException('Erro ao criar o personagem', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

  @Get()
  async findAll() : Promise<Personagem[]> {
    try{
      return await this.personagensService.findAll();
    } catch (error) {
      throw new HttpException('Erro ao buscar os personagens', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Personagem> {
    try{
      return await this.personagensService.findOne(id);
    } catch (error) {
      throw new HttpException('Personagem não encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePersonagemDto: UpdatePersonagemDto): Promise<Personagem> {
    try{
    return await this.personagensService.update(id, updatePersonagemDto);
    }
    catch (error) {
      throw new HttpException('Erro ao atualizar o personagem', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Personagem>  {
    try{
      return await this.personagensService.remove(id);
    } catch (error) {
      throw new HttpException('Erro ao excluir o personagem', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



}
