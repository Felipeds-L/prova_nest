import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateAuthInput } from './dto/create-auth.input';
import { CreateValidatorUserInput } from './dto/create-validator-user.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ){}

  async valitadeCredentials({ email, password }: CreateAuthInput): Promise<CreateValidatorUserInput>{
    try{
      const user = await this.userService.findOne(email);
      let check_pass = false
      if(user.password === password){
        check_pass = true
      }

      if(check_pass && user){
        
        const token = await this.login(user)
        return {
          token,
          user,
        }
      }else{
        throw new Error()
      }
    }catch(error){
      throw new UnauthorizedException('Email or Password is not correct, check it again!')
    }
  }

  async login(user: User): Promise<string>{
    const paylod = {
      id: user.id,
      email: user.email,
      username: user.username
    }

    return this.jwtService.sign(paylod)
  }
}
