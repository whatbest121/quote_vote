import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({collection: "users"})
export class User extends Document{
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;
}
export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User);
