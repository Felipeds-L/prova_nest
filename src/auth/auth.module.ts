import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserLevelAccessModule } from 'src/user-level-access/user-level-access.module';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './Jwt.strategy';

@Module({
  imports:[
    UserModule,
    PassportModule,
    UserLevelAccessModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'mySecretWord',
        signOptions: {expiresIn: '1d'}
      })
    })
  ],
  providers: [AuthService, JwtStrategy],
  exports:[ AuthService ]
})
export class AuthModule {}
