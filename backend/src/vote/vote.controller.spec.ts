import { Test, TestingModule } from '@nestjs/testing';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';

describe('VoteController', () => {
  let controller: VoteController;
  let service: VoteService;

  beforeEach(async () => {
    service = { vote: jest.fn(), cancelVote: jest.fn() } as any;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoteController],
      providers: [{ provide: VoteService, useValue: service }],
    }).compile();

    controller = module.get<VoteController>(VoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should vote on a quote', async () => {
    (service.vote as jest.Mock).mockResolvedValue({ hasVoted: true });
    const result = await controller.vote({ quote_id: 'q1' }, { users: { _id: 'u1' } } as any);
    expect(result).toHaveProperty('hasVoted', true);
  });

  it('should cancel vote', async () => {
    (service.cancelVote as jest.Mock).mockResolvedValue({ hasVoted: false });
    const result = await controller.cancelVote({ quote_id: 'q1' }, { users: { _id: 'u1' } } as any);
    expect(result).toHaveProperty('hasVoted', false);
  });
});