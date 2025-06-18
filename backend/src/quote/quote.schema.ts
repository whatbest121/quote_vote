import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({ collection: 'quotes', timestamps: true })
export class Quote extends Document {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  quote: string;

}

export type QuoteDocument = Quote & Document;

export const QuoteSchema = SchemaFactory.createForClass(Quote);

QuoteSchema.plugin(mongoosePaginate);
