import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quote, QuoteSchema } from './quote.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quote.name, schema: QuoteSchema }])
  ],
  providers: [QuoteService],
  controllers: [QuoteController]
})
export class QuoteModule { }
