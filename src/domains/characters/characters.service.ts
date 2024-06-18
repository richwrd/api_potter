import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import * as fs from 'fs';

import { CreateCharactersDto, UpdateCharactersDto } from './dto/create-character.dto';
import { Characters } from './schemas/characters.schema';

@Injectable()
export class CharactersService {

  constructor(@InjectModel(Characters.name) private characterModel: Model<Characters>, private configService: ConfigService,) { }

  
  async fetchAndSaveAllCharacters(): Promise<void> {
    try {
      const URL_API_POTTER_CHARACTER = this.configService.get<string>('URL_API_POTTER_CHARACTER');

      const url = `${URL_API_POTTER_CHARACTER}`;

      console.log(url);
      const response = await axios.get(url, { timeout: 3600000 });

      const results = response.data.data.results;

      // Iterar sobre cada personagem e fazer uma solicitação GET para a URL de cada personagem
      for (const character of results) {
        for (const item of character.characters.items) {
          await this.fetchCharacterAndSave(item.resourceURI);
        }
      }
    } catch (error) {
      console.error(`Erro ao buscar e salvar personagens: ${error.message}`);
    }
  }

  async fetchCharacterAndSave(url: string): Promise<void> {
    try {
      const response = await axios.get(url);
      const characterData = response.data.data.results;

      // Salvar os dados do personagem no banco de dados
      await this.saveCharacter(characterData);
    } catch (error) {
      console.error(`Erro ao buscar personagem: ${error.message}`);
    }
  }

  async saveCharacter(characterData: any): Promise<void> {
    try {
      // Criar uma nova instância do modelo Characters
      const character = new this.characterModel({
        id: characterData.id,
        name: characterData.name,
        description: characterData.description,
        thumbnail: `${characterData.thumbnail.path}.${characterData.thumbnail.extension}`,
        comics: characterData.comics.items.map((comic: any) => ({
          id: comic.resourceURI.split('/').pop(),
          name: comic.name,
        })),
      });

      // Salvar o personagem no banco de dados
      await character.save();
      console.log(`Personagem ${characterData.name} salvo com sucesso.`);
    } catch (error) {
      console.error(`Erro ao salvar personagem: ${error.message}`);
    }
  }

  async create(createCharacterDto: CreateCharactersDto): Promise<Characters> {
    const createdCharacter = new this.characterModel(createCharacterDto);
    return createdCharacter.save();
  }

  async findAll(): Promise<Characters[]> {
    return this.characterModel.find().exec();
  }

  async findOne(id: string): Promise<Characters> {
    const character = await this.characterModel.findById(id).exec();
    if (!character) {
      throw new NotFoundException(`Personagem com o ID ${id} não encontrado`);
    }
    return character;
  }

  async update(id: string, updateCharacterDto: UpdateCharactersDto): Promise<Characters> {
    const existingCharacter = await this.characterModel.findByIdAndUpdate(id, updateCharacterDto, { new: true }).exec();
    if (!existingCharacter) {
      throw new NotFoundException(`Personagem com o ID ${id} não encontrado`);
    }
    return existingCharacter;
  }

  async remove(id: string): Promise<Characters> {
    const deletedCharacter = await this.characterModel.findByIdAndDelete(id).exec();
    if (!deletedCharacter) {
      throw new NotFoundException(`Personagem com o ID ${id} não encontrado`);
    }
    return deletedCharacter;
  }
}
