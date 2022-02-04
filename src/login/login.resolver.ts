import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateValidatorUserInput } from 'src/auth/dto/create-validator-user.input';
import { CreateLoginInput } from './dto/create-login.input';
import { LoginService } from './login.service';

@Resolver()
export class LoginResolver {
  constructor(
    private loginService: LoginService
  ){}

  @Mutation(() => CreateValidatorUserInput)
  async madeLogin(
    @Args('data') data: CreateLoginInput
  ){
    return this.loginService.login(data)
  }
}
