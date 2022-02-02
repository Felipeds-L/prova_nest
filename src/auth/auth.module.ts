import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserLevelAccessModule } from 'src/user-level-access/user-level-access.module';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    UserLevelAccessModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '500s'},
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
