import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  private boards = []; //memory repository

  getAllBoards(){
    return this.boards;
  }
}
