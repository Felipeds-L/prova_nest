import { InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@InputType()

export class CreateLoginInput{
  @IsString()
  @IsNotEmpty({message: 'You need pass a email!'})
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty({message: 'You need pass a password!'})
  password: string
}