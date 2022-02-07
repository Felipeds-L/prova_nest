import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './Jwt.strategy';
import { jwtConstants } from './constants';


@Module({
  imports:[
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '50m'}
    })
  ],
  providers: [AuthService, JwtStrategy],
  exports:[ AuthService ]
})
export class AuthModule {}
