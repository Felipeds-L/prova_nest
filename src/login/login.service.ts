import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateLoginInput } from './dto/create-login.input';


@Injectable()
export class LoginService {
  constructor(
    private authService: AuthService
  ){}

  async login(data: CreateLoginInput){
    const log = await this.authService.valitadeCredentials(data)

    return log
  }
}
