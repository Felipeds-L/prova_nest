import { Test, TestingModule } from '@nestjs/testing';
import { UserLevelAccessResolver } from './user-level-access.resolver';

describe('UserLevelAccessResolver', () => {
  let resolver: UserLevelAccessResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLevelAccessResolver],
    }).compile();

    resolver = module.get<UserLevelAccessResolver>(UserLevelAccessResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
