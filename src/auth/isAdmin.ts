import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UserLevelAccessService } from "src/user-level-access/user-level-access.service";
import { User } from "src/user/user.entity";

@Injectable()
export class IsAdmin implements CanActivate{
  constructor(
    private userLevelService: UserLevelAccessService
  ){}

  async canActivate (context: ExecutionContext){
    const contexts = GqlExecutionContext.create(context)
    console.log(contexts.getContext().r)
    const user:User = contexts.getContext().req.user;
    
    const is_admin = await this.userLevelService.findUserLevel(user.id)

    if(!is_admin){
      throw new ForbiddenException('Only administrators can made this operation!')
    }

    return true
  }
}