import { Test, TestingModule } from '@nestjs/testing';
import { LevelAccessService } from './level-access.service';

describe('LevelAccessService', () => {
  let service: LevelAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LevelAccessService],
    }).compile();

    service = module.get<LevelAccessService>(LevelAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
