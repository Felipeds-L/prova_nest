import { Module } from '@nestjs/common';
import { UserLevelAccessResolver } from './user-level-access.resolver';

@Module({
  providers: [UserLevelAccessResolver]
})
export class UserLevelAccessModule {}
