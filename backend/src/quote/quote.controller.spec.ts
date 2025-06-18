import { Test, TestingModule } from '@nestjs/testing';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';

describe('QuoteController', () => {
  let controller: QuoteController;
  let service: QuoteService;

  beforeEach(async () => {
    service = { paginateQuotes: jest.fn() } as any;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [{ provide: QuoteService, useValue: service }],
    }).compile();

    controller = module.get<QuoteController>(QuoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get paginated quotes', async () => {
    (service.paginateQuotes as jest.Mock).mockResolvedValue({ docs: [] });
    const result = await controller.getPaginatedQuotes({ search: '', page: '1', limit: '10', sort: 'createdAt' }, { users: { _id: 'u1' } } as any);
    expect(result).toHaveProperty('docs');
  });
});