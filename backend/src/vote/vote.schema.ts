import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({ collection: 'votes', timestamps: true })
export class Vote extends Document {
  @Prop({ required: true })
  user_id: Types.ObjectId;;

  @Prop({ required: true })
  quote_id: Types.ObjectId;;

  @Prop({ required: true, enum: ['up', 'down'] })
  vote: 'up' | 'down';
}

export type VoteDocument = Vote & Document;
export const VoteSchema = SchemaFactory.createForClass(Vote);
VoteSchema.plugin(mongoosePaginate)
VoteSchema.index({ user_id: 1, quote_id: 1 }, { unique: true });
