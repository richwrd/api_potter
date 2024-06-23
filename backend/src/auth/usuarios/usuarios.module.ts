import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';

import { Usuario, UsuarioSchema } from './schema/usuario.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }])
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService, MongooseModule],
})
export class UsuariosModule { }
