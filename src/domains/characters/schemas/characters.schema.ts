import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type CharactersSchemaDocument = HydratedDocument<Characters>;


@Schema()
export class Characters {
    @Prop({ required: true, unique: true })
    id: number;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    imagem: string;
}

export const CharactersSchema = SchemaFactory.createForClass(Characters);