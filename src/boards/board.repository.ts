import { DataSource, EntityRepository, Repository } from "typeorm";
import { Board } from "./board.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board-statuss.enum.";
import { User } from "../auth/user.entity";

//@EntityRepository() //Board를 컨트롤하는 db임을 선언3
@Injectable()
export class BoardRepository extends Repository<Board>{
  constructor(dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(createBoardDto : CreateBoardDto, user: User): Promise<Board>{
    const {title,description} = createBoardDto;

    //db생성시 .create 이용해야
    const board = this.create({
      // id : uuid(),  //자동으로 유니크한 값을 넣어줌
      title : title,
      description : description,
      status : BoardStatus.PUBLIC,
      user
    })

    await this.save(board);
    return board;
  }
}