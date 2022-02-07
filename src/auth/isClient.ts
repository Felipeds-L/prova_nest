import { CanActivate, ExecutionContext, ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "src/user/user.entity";

@Injectable()
export class IsClient implements CanActivate{
  constructor(){}

  async canActivate (context: ExecutionContext){
    const contexts = GqlExecutionContext.create(context)
    const user:User = contexts.getContext().req.user;
    
    const isClient = user.access.some(
      (level) => level.level == 'client'
    )
    
    if(isClient){
      return true
    }
    
    throw new ForbiddenException('Only clients can do this!')
    
  }
}