import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PersonagensService } from './personagens.service';
import { PersonagensController } from './personagens.controller';

import { Personagem, PersonagemSchema } from './schema/personagem.schema';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Personagem.name, schema: PersonagemSchema }])
  ],
  controllers: [PersonagensController],
  providers: [PersonagensService],
})

export class PersonagensModule { }
