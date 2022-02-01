import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserLevelAccess } from "src/user-level-access/user-level-access.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class LevelAccess{

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Column()
  level: string

  @OneToMany(() => UserLevelAccess, userLevel => userLevel.id)
  public user_level: UserLevelAccess[]
}