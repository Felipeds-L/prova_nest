import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@ObjectType()
@Entity()

export class UserLevelAccess{
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Column()
  user_id: number

  @Column()
  level_access_id: number
}