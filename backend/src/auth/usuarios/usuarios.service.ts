import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

import { Usuario } from './schema/usuario.schema';

@Injectable()
export class UsuariosService {

  constructor(@InjectModel(Usuario.name) private usuarioModel: Model<Usuario>) { }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = new this.usuarioModel(createUsuarioDto);
    return await usuario.save();
  }

  async findAll(admin: boolean): Promise<Usuario[]> {

    if(admin == true){
      return await this.usuarioModel.find().exec();
    }
  }

  async existeUsername(username: string): Promise<Boolean>{
    const usuario = await this.usuarioModel.findOne({ username }).exec();
    if (!usuario) {
      return false;
    }
    return true;
  }
  
  async existeEmail(email: string): Promise<Boolean>{
    const usuario = await this.usuarioModel.findOne({ email }).exec();
    if (!usuario) {
      return false;
    }
    return true;
  }

  async findOne(email_username: string): Promise<Usuario> {
    // Verifica se a entrada é um email
    const isEmail = /\S+@\S+\.\S+/.test(email_username);

    if (isEmail) {
      return this.findOneByEmail(email_username);
    } else {
      return this.findOneByUsername(email_username);
    }
  }

  async findOneByUsername(username: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ username }).exec();
  }

  async findOneByEmail(email: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ email }).exec();
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuarioAtualizado = await this.usuarioModel.findByIdAndUpdate(id, updateUsuarioDto, { new: true }).exec();
    if (!usuarioAtualizado) {
      throw new NotFoundException(`Usuário com o ID ${id} não encontrado`);
    }
    return usuarioAtualizado;
  }

  async remove(id: string): Promise<Usuario> {
    const usuarioDeletado = await this.usuarioModel.findByIdAndDelete(id).exec();
    if (!usuarioDeletado) {
      throw new NotFoundException(`Usuário com o ID ${id} não encontrado`);
    }
    return usuarioDeletado;
  }
  

}
