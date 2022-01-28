import { Test, TestingModule } from '@nestjs/testing';
import { UserLevelAccessService } from './user-level-access.service';

describe('UserLevelAccessService', () => {
  let service: UserLevelAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLevelAccessService],
    }).compile();

    service = module.get<UserLevelAccessService>(UserLevelAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
