import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Board } from "../boards/board.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string

  //상대의타입, 상대방에서 나를 부르는 별칭, this(user)를 가져올때 상대방(board)도 가져오도록
  @OneToMany(type => Board, board => board.user, {eager: true})
  boards: Board[]
}