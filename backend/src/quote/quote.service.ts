import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quote, QuoteDocument } from './quote.schema';
import { PaginateModel, Types } from 'mongoose';
import { Vote, VoteDocument } from '../vote/vote.schema';

export type QuoteModelPaginate = PaginateModel<QuoteDocument>;

@Injectable()
export class QuoteService {
    constructor(
        @InjectModel(Quote.name)
        private quoteModel: QuoteModelPaginate,
        @InjectModel(Vote.name)
        private voteModel: PaginateModel<VoteDocument>
    ) { }

    async createQuote(quote: string, user_id: string) {
        const result = await this.quoteModel.create({ quote, user_id })
        return result
    }

    async editQuote(_id: string, quote: string, user_id: string) {
        const result = await this.quoteModel.findOneAndUpdate(
            {
                _id,
                user_id,
            },
            { $set: { quote } },
            { new: true }
        );
        if (!result) {
            throw new NotFoundException('Quote not found or not owned by user');
        }
        return result
    }

    async paginateQuotes(
        search = '',
        page = 1,
        limit = 10,
        sort = 'createdAt',
        currentUserId?: string
    ) {
        const filter: any = {};

        if (search) {
            filter.$or = [
                { quote: { $regex: search, $options: 'i' } },
                { user_id: { $regex: search, $options: 'i' } },
            ];
        }

        const paginatedResult = await this.quoteModel.paginate(filter, {
            page,
            limit,
            sort: { [sort]: -1 },
        });

        if (currentUserId) {
            const quotesWithVoteStatus = await Promise.all(
                paginatedResult.docs.map(async (quote) => {
                    const quoteObj = quote.toObject();

                    const userVote = await this.voteModel.findOne({
                        user_id: currentUserId,
                        quote_id: quote._id
                    });

                    const hasVotedOnAny = await this.voteModel.findOne({
                        user_id: currentUserId
                    });

                    return {
                        ...quoteObj,
                        hasVoted: !!userVote,
                        canVote: !userVote && !hasVotedOnAny && quote.user_id !== currentUserId,
                        isOwnQuote: quote.user_id === currentUserId,
                        voteCount: await this.getVoteCount(String(quoteObj._id))
                    };
                })
            );

            return {
                ...paginatedResult,
                docs: quotesWithVoteStatus
            };
        }

        return paginatedResult;
    }

    async getVoteCount(quoteId: string) {
        const upvotes = await this.voteModel.countDocuments({
            quote_id: quoteId,
            vote: 'up'
        });
        const downvotes = await this.voteModel.countDocuments({
            quote_id: quoteId,
            vote: 'down'
        });
        return upvotes - downvotes;
    }

    async deleteQuotes(_id: string, user_id: string) {
        const result = await this.quoteModel.findOneAndDelete(
            {
                _id,
                user_id,
            },
            { new: true }
        );
        if (!result) {
            throw new NotFoundException('Quote not found or not owned by user');
        }
        return result
    }

    async getByuser(user_id: string) {
        const result = this.quoteModel.find({ user_id })
        return result
    }
}
