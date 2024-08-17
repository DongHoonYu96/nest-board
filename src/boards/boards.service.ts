import { Injectable, NotFoundException } from "@nestjs/common";
import { BoardStatus } from "./board-statuss.enum.";
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from "./dto/create-board.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardRepository } from "./board.repository";
import { Board } from "./board.entity";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository) //변수에 의존성 주입해줘
    private boardRepository: BoardRepository) {
  }

  async getBoardById(id: number): Promise <Board>{
    const found = await this.boardRepository.findOneBy({ id: id });

    if(!found){
      throw new NotFoundException(`Can\`t find Board with id ${id}`);
    }
    return found;
  }

  createBoard(createBoardDto : CreateBoardDto): Promise<Board>{
      return this.boardRepository.createBoard(createBoardDto);
  }

  async deleteBoard(id : number){
    return this.boardRepository.delete(id);
  }
  // private boards : Board[] = []; //memory repository
  //
  // getAllBoards() : Board[]{
  //   return this.boards;
  // }
  //
  // createBoard(createBoardDto : CreateBoardDto){
  //   const {title,description} = createBoardDto;
  //
  //   const board = {
  //     id : uuid(),  //자동으로 유니크한 값을 넣어줌
  //     title : title,
  //     description : description,
  //     status : BoardStatus.PUBLIC
  //   }
  //
  //   this.boards.push(board);
  //   return board;
  // }
  //
  // getBoardByID(id:string): Board{
  //   const found = this.boards.find((board) => board.id===id);
  //   if(!found){
  //     throw new NotFoundException(`Can\`t find board with id ${id}`);
  //   }
  //   return found;
  // }
  //
  // deleteBoard(id:string):void{
  //   const found = this.getBoardByID(id);
  //   //filter => 해당 id제외 해서 새로운 boards를 만듬
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  //
  // updateBoardStatus(id:string, status : BoardStatus) : Board{
  //   const board = this.getBoardByID(id);
  //   board.status = status;
  //   return board;
  // }
}
