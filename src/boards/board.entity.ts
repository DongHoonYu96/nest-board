import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board-statuss.enum.";

@Entity()
export class Board extends BaseEntity{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  title:string;

  @Column()
  description:string;

  @Column()
  status : BoardStatus

  // static async findOneByaa(id: string): Promise<Board> {
  //   return this.findOne({ id })
  // }
}