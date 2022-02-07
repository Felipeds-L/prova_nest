import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LevelAccessModule } from 'src/level-access/level-access.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    LevelAccessModule,
    MailModule
  ],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}
