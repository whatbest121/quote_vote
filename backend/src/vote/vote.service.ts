import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quote } from 'src/quote/quote.schema';
import { QuoteModelPaginate } from 'src/quote/quote.service';
import { Vote, VoteDocument } from './vote.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class VoteService {
    constructor(
        @InjectModel(Quote.name)
        private quoteModel: QuoteModelPaginate,

        @InjectModel(Vote.name)
        private voteModel: Model<VoteDocument>,
    ) { }

    async vote(user_id: string, quote_id: string) {
        const quote = await this.quoteModel.findById(quote_id);
        if (!quote) throw new NotFoundException('Quote not found');
        if (quote.user_id === user_id) {
            throw new BadRequestException('Cannot vote your own quote');
        }
        const existingVote = await this.voteModel.findOne({ user_id, quote_id });
        if (existingVote) {
            throw new BadRequestException('You already voted this quote');
        }

        return this.voteModel.create({
            user_id: new Types.ObjectId(user_id),
            quote_id: new Types.ObjectId(quote_id), vote: "up"
        });
    }

    async cancelVote(user_id: string, quote_id: string) {
        const result = await this.voteModel.findOneAndDelete({
            user_id: new Types.ObjectId(user_id),
            quote_id: new Types.ObjectId(quote_id),
        });
        if (!result) {
            throw new NotFoundException('No vote found to cancel');
        }
        return result;
    }

    async quote_votes(quote_id: string) {
        const result = await this.quoteModel.aggregate([
            {
                $match: { _id: new Types.ObjectId(quote_id) }
            },
            {
                $lookup: {
                    from: 'votes',
                    localField: '_id',
                    foreignField: 'quote_id',
                    as: 'votes',
                },
            },
            {
                $addFields: {
                    vote: {
                        $subtract: [
                            { $size: { $filter: { input: '$votes', cond: { $eq: ['$$this.vote', 'up'] } } } },
                            { $size: { $filter: { input: '$votes', cond: { $eq: ['$$this.vote', 'down'] } } } },
                        ],
                    },
                },
            },
            {
                $project: {
                    votes: 0,
                },
            },
        ]);
        return result[0]; // เพราะเราใช้ $match แล้วจะได้แค่ 1 ตัว
    }

    async hasVoted(user_id: string, quote_id: string) {
        const vote = await this.voteModel.findOne({ user_id, quote_id });
        return !!vote
    }
}
