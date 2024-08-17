import { Injectable } from '@nestjs/common';
import { Board } from "./board.model";

@Injectable()
export class BoardsService {
  private boards : Board[] = []; //memory repository

  getAllBoards() : Board[]{
    return this.boards;
  }
}
