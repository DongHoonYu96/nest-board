import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from "./board.model";
import {v1 as uuid} from 'uuid';

@Injectable()
export class BoardsService {
  private boards : Board[] = []; //memory repository

  getAllBoards() : Board[]{
    return this.boards;
  }

  createBoard(title : string, description : string){
    const board = {
      id : uuid(),  //자동으로 유니크한 값을 넣어줌
      title : title,
      description : description,
      status : BoardStatus.PUBLIC
    }

    this.boards.push(board);
    return board;
  }
}
