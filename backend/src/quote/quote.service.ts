import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quote, QuoteDocument } from './quote.schema';
import { PaginateModel, Types } from 'mongoose';
import { find } from 'rxjs';

export type QuoteModelPaginate = PaginateModel<QuoteDocument>;
@Injectable()
export class QuoteService {
    constructor(
        @InjectModel(Quote.name)
        private quoteModel: QuoteModelPaginate
    ) { }

    async createQuote(quote: string, user_id: string) {
        const result = await this.quoteModel.create({ quote, user_id: new Types.ObjectId(user_id) })
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
    ) {
        const filter: any = {};

        if (search) {
            filter.$or = [
                { quote: { $regex: search, $options: 'i' } },
                { user_id: { $regex: search, $options: 'i' } },
            ];
        }

        return this.quoteModel.paginate(filter, {
            page,
            limit,
            sort: { [sort]: -1 },
        });
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
