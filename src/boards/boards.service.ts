import { Injectable, NotFoundException } from "@nestjs/common";
import { Board, BoardStatus } from "./board.model";
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from "./dto/create-board.dto";

@Injectable()
export class BoardsService {
  private boards : Board[] = []; //memory repository

  getAllBoards() : Board[]{
    return this.boards;
  }

  createBoard(createBoardDto : CreateBoardDto){
    const {title,description} = createBoardDto;

    const board = {
      id : uuid(),  //자동으로 유니크한 값을 넣어줌
      title : title,
      description : description,
      status : BoardStatus.PUBLIC
    }

    this.boards.push(board);
    return board;
  }

  getBoardByID(id:string): Board{
    const found = this.boards.find((board) => board.id===id);
    if(!found){
      throw new NotFoundException(`Can\`t find board with id ${id}`);
    }
    return found;
  }

  deleteBoard(id:string):void{
    const found = this.getBoardByID(id);
    //filter => 해당 id제외 해서 새로운 boards를 만듬
    this.boards = this.boards.filter((board) => board.id !== found.id);
  }

  updateBoardStatus(id:string, status : BoardStatus) : Board{
    const board = this.getBoardByID(id);
    board.status = status;
    return board;
  }
}
