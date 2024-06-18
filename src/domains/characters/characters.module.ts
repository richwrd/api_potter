import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


import { Characters, CharactersSchema } from './schemas/characters.schema';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Characters.name, schema: CharactersSchema }]),
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharacterModule { }
