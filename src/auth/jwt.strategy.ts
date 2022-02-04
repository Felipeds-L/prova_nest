import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { ExtractJwt } from "passport-jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    private userService: UserService
  ){
    super({
      jwtRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false
    })
  }

  async validation(payload: {id: number, email: string}){
    try{
      const user = await this.userService.userById(payload.id)
      return user
    }catch{
      throw new UnauthorizedException()
    }
  }
}