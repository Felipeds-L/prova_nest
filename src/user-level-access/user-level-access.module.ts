import { Module } from '@nestjs/common';
import { UserLevelAccessService } from './user-level-access.service';
import { UserLevelAccessResolver } from './user-level-access.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLevelAccess } from './user-level-access.entity';

@Module({
  providers: [UserLevelAccessService, UserLevelAccessResolver],
  imports: [
    TypeOrmModule.forFeature([UserLevelAccess])
  ],
})
export class UserLevelAccessModule {}
