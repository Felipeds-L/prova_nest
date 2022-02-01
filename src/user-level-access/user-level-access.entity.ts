import { Field, ID, ObjectType } from "@nestjs/graphql";
import { LevelAccess } from "src/level-access/level-access.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class UserLevelAccess{

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @ManyToOne(() => User, user => user.id)
  user: number

  @ManyToOne(() => LevelAccess, levelAccess => levelAccess.id)
  level_access: number

}