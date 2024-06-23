import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import axios from 'axios';
import * as fs from 'fs';

import { CreatePersonagemDto, UpdatePersonagemDto } from './dto/create-personagem.dto';
import { Personagem } from './schema/personagem.schema';


@Injectable()
export class PersonagensService {
  
  constructor(@InjectModel(Personagem.name) private personagemModel: Model<Personagem>, private configService: ConfigService) { }

  async create(createPersonagemDto: CreatePersonagemDto): Promise<Personagem> {
    const personagem = new this.personagemModel(createPersonagemDto);
    return await personagem.save();
  }

  async findAll(): Promise<Personagem[]> {
    return await this.personagemModel.find().exec();
  }

  async findOne(id: string): Promise<Personagem> {
    const personagem = await this.personagemModel.findById(id).exec();
    if (!personagem) {
      throw new NotFoundException(`Personagem com o ID ${id} não encontrado`);
    }
    return personagem;
  }

  async update(id: string, updatePersonagemDto: UpdatePersonagemDto): Promise<Personagem> {
    const personagem_atualizado = await this.personagemModel.findByIdAndUpdate(id, updatePersonagemDto, { new: true }).exec();
    if (!personagem_atualizado) {
      throw new NotFoundException(`Personagem com o ID ${id} não encontrado`);
    }
    return personagem_atualizado;
  }

  async remove(id: string): Promise<Personagem> {
    const personagem_deletado = await this.personagemModel.findByIdAndDelete(id).exec();
    if (!personagem_deletado) {
      throw new NotFoundException(`Personagem com o ID ${id} não encontrado`);
    }
    return personagem_deletado;
  }

  async fetchAndSaveAllPersonagens(): Promise<void> {
    try {
      const URL_API_POTTER_CHARACTER = this.configService.get<string>('URL_API_POTTER_CHARACTER');
      const url = `${URL_API_POTTER_CHARACTER}`;

      const response = await axios.get(url, { timeout: 3600000 });

      const personagens = response.data;
      
      for (const personagem of personagens) {
        await this.savePersonagem(personagem);
      }

    } catch (error) {
      console.error(`Erro ao buscar e salvar personagens: ${error.message}`);
    }
  }

  async savePersonagem(personagemData: any): Promise<void> {
    try {
      const personagem = new this.personagemModel({
        id: personagemData.id,
        nome: personagemData.name,
        imagem: personagemData.image,
      });

      await personagem.save();
    } catch (error) {
      console.error(`Erro ao salvar personagem: ${error.message}`);
    }
  }

}
