import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth-guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { CreateUserInput } from './user/dto/create-user.input';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService
  ) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
