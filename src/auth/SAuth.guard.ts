import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Injectable()
export class SAuthGuard extends AuthGuard('jwt'){
  getRequest(context: ExecutionContext): Request{
    const contexts = GqlExecutionContext.create(context)
    return contexts.getContext().req
  }
}