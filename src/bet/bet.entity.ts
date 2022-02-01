import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Game } from "src/game/game.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Bet{

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @ManyToOne(() => Game, game => game.id)
  game: number
  
  @ManyToOne(() => User, user => user.id)
  user: number

  @Column()
  numbers_choosed: string

}