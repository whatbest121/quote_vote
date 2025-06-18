import { Test, TestingModule } from '@nestjs/testing';
import { VoteService } from './vote.service';
import { getModelToken } from '@nestjs/mongoose';
import { Vote } from './vote.schema';
import { Quote } from '../quote/quote.schema';

describe('VoteService', () => {
  let service: VoteService;
  let voteModel: any;
  let quoteModel: any;

  beforeEach(async () => {
    voteModel = { findOne: jest.fn(), create: jest.fn(), findOneAndDelete: jest.fn(), countDocuments: jest.fn() };
    quoteModel = { findById: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoteService,
        { provide: getModelToken(Vote.name), useValue: voteModel },
        { provide: getModelToken(Quote.name), useValue: quoteModel },
      ],
    }).compile();

    service = module.get<VoteService>(VoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should vote on a quote', async () => {
    quoteModel.findById.mockResolvedValue({
      _id: '507f1f77bcf86cd799439011',
      user_id: 'u2',
      toObject: function () { return this; }
    });
    voteModel.findOne.mockResolvedValueOnce(null); // already voted on this quote
    voteModel.findOne.mockResolvedValueOnce(null); // voted on any quote
    voteModel.create.mockResolvedValue({ user_id: 'u1', quote_id: '507f1f77bcf86cd799439011', vote: 'up' });
    voteModel.countDocuments.mockResolvedValue(1);

    const result = await service.vote('u1', '507f1f77bcf86cd799439011');
    expect(result).toHaveProperty('hasVoted', true);
  });

  it('should cancel vote', async () => {
    voteModel.findOneAndDelete.mockResolvedValue({ user_id: 'u1', quote_id: '507f1f77bcf86cd799439011' });
    quoteModel.findById.mockResolvedValue({
      _id: '507f1f77bcf86cd799439011',
      user_id: 'u2',
      toObject: function () { return this; }
    });
    voteModel.findOne.mockResolvedValueOnce(null); // userVote
    voteModel.findOne.mockResolvedValueOnce(null); // hasVotedOnAny
    voteModel.countDocuments.mockResolvedValue(0);

    const result = await service.cancelVote('u1', '507f1f77bcf86cd799439011');
    expect(result).toHaveProperty('hasVoted', false);
  });
});