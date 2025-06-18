import { Test, TestingModule } from '@nestjs/testing';
import { QuoteService } from './quote.service';
import { getModelToken } from '@nestjs/mongoose';
import { Quote } from './quote.schema';
import { Vote } from '../vote/vote.schema';

describe('QuoteService', () => {
  let service: QuoteService;
  let quoteModel: any;
  let voteModel: any;

  beforeEach(async () => {
    quoteModel = { findById: jest.fn(), create: jest.fn(), paginate: jest.fn(), findOneAndUpdate: jest.fn() };
    voteModel = { findOne: jest.fn(), countDocuments: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuoteService,
        { provide: getModelToken(Quote.name), useValue: quoteModel },
        { provide: getModelToken(Vote.name), useValue: voteModel },
      ],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a quote', async () => {
    quoteModel.create.mockResolvedValue({ quote: 'test', user_id: 'user1' });
    const result = await service.createQuote('test', 'user1');
    expect(result).toEqual({ quote: 'test', user_id: 'user1' });
  });

  it('should paginate quotes and include vote status', async () => {
    quoteModel.paginate.mockResolvedValue({ docs: [{ _id: '507f1f77bcf86cd799439011', user_id: 'u1', quote: 'hi', toObject: function () { return this; } }] });
    voteModel.findOne.mockResolvedValueOnce(null); // userVote
    voteModel.findOne.mockResolvedValueOnce(null); // hasVotedOnAny
    voteModel.countDocuments.mockResolvedValueOnce(1); // upvotes
    voteModel.countDocuments.mockResolvedValueOnce(0); // downvotes

    const result = await service.paginateQuotes('', 1, 10, 'createdAt', 'user2');
    expect(result.docs[0]).toHaveProperty('hasVoted', false);
    expect(result.docs[0]).toHaveProperty('canVote', true);
    expect(result.docs[0]).toHaveProperty('isOwnQuote', false);
    expect(result.docs[0]).toHaveProperty('voteCount', 1);
  });
});