import { createParamDecorator, ExecutionContext} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const userLogged = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const contexts = GqlExecutionContext.create(context);
    return contexts.getContext().req.user;
  },
);