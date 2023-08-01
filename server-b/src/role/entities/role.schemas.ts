import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Role extends Document {
  @Prop({ required: true })
  role_name: string;

  @Prop({ required: true })
  status: string;


}

export const RoleSchema = SchemaFactory.createForClass(Role);


