import { Module } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Quote, QuoteSchema } from '../quote/quote.schema';
import { Vote, VoteSchema } from './vote.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quote.name, schema: QuoteSchema },
      { name: Vote.name, schema: VoteSchema }
    ])
  ],
  controllers: [VoteController],
  providers: [VoteService]
})
export class VoteModule { }
