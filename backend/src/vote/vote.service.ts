import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quote, QuoteDocument } from '../quote/quote.schema';
import { QuoteModelPaginate } from 'src/quote/quote.service';
import { Vote, VoteDocument } from './vote.schema';
import { Model, Types } from 'mongoose';

export type VoteModelPaginate = Model<VoteDocument>;

@Injectable()
export class VoteService {
    constructor(
        @InjectModel(Quote.name)
        private quoteModel: QuoteModelPaginate,

        @InjectModel(Vote.name)
        private voteModel: VoteModelPaginate,
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

        const hasVotedOnAny = await this.voteModel.findOne({
            user_id: user_id
        });

        if (hasVotedOnAny) {
            throw new BadRequestException('User has already voted on another quote');
        }

        const vote = await this.voteModel.create({
            user_id: user_id,
            quote_id: quote_id,
            vote: 'up'
        });

        return await this.getUpdatedQuoteData(quote_id, user_id);
    }

    async cancelVote(user_id: string, quote_id: string) {
        const result = await this.voteModel.findOneAndDelete({
            user_id: user_id,
            quote_id: quote_id,
        });
        if (!result) {
            throw new NotFoundException('No vote found to cancel');
        }
        return await this.getUpdatedQuoteData(quote_id, user_id);
    }

    async getUpdatedQuoteData(quoteId: string, userId: string) {
        const quote = await this.quoteModel.findById(quoteId);
        if (!quote) {
            throw new NotFoundException('Quote not found');
        }

        const quoteObj = quote.toObject();

        const userVote = await this.voteModel.findOne({
            user_id: new Types.ObjectId(userId),
            quote_id: quote._id
        });

        const hasVotedOnAny = await this.voteModel.findOne({
            user_id: new Types.ObjectId(userId)
        });

        const voteCount = await this.quote_votes(quoteId);

        return {
            ...quoteObj,
            hasVoted: !!userVote,
            canVote: !userVote && !hasVotedOnAny && quote.user_id.toString() !== userId,
            isOwnQuote: quote.user_id.toString() === userId,
            voteCount
        };
    }

    async quote_votes(quote_id: string) {
        const upvotes = await this.voteModel.countDocuments({
            quote_id: quote_id,
            vote: 'up'
        });
        const downvotes = await this.voteModel.countDocuments({
            quote_id: quote_id,
            vote: 'down'
        });
        return upvotes - downvotes;
    }

    async hasVoted(user_id: string, quote_id: string) {
        const vote = await this.voteModel.findOne({
            user_id: user_id,
            quote_id: quote_id,
        });
        return !!vote
    }

    async chackUserVote(user_id: string) {
        const vote = await this.voteModel.findOne({ user_id: user_id, });
        return !!vote
    }
}
