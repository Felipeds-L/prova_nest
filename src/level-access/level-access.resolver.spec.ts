import { Test, TestingModule } from '@nestjs/testing';
import { LevelAccessResolver } from './level-access.resolver';

describe('LevelAccessResolver', () => {
  let resolver: LevelAccessResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LevelAccessResolver],
    }).compile();

    resolver = module.get<LevelAccessResolver>(LevelAccessResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
