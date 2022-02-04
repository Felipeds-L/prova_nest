import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.entity";

@ObjectType()
export class CreateValidatorUserInput{
  @Field()
  user: User

  @Field()
  token: string
}