import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "src/user/user.entity";

@Injectable()
export class IsAdmin implements CanActivate{
  constructor(){}

  async canActivate (context: ExecutionContext){
    const contexts = GqlExecutionContext.create(context)
    const user:User = contexts.getContext().req.user;
    
    const isAdmin = user.access.some(
      (level) => level.level == 'admin'
    )
    
    if(isAdmin){
      return true
    }

    throw new ForbiddenException('Only administrators can do this!')
  }
}