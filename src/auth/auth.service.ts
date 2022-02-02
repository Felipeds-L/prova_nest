import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ){}

  async validateUser(email: string, password: string): Promise<any>{
    const user = await this.usersService.findOne(email)
  
    if(user && user.password === password){
      const token = await this.login(user)
      return {
        token, 
        user
      }
    }
    return null
  }

  async login(user: any){
    const payload = {
      username: user.username, 
      email: user.email,
      sub: user.id
    }
    return {
      access_token: this.jwtService.sign(payload),
      user: user.user
    }
  }
}