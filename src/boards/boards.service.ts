import { Injectable, NotFoundException } from "@nestjs/common";
import { BoardStatus } from "./board-statuss.enum.";
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from "./dto/create-board.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardRepository } from "./board.repository";
import { Board } from "./board.entity";
import { User } from "../auth/user.entity";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository) //변수에 의존성 주입해줘
    private boardRepository: BoardRepository) {
  }
  async getAllBoards(user : User){
    //raw sql생성, board table에서 할거임
    const query= this.boardRepository.createQueryBuilder('board');

    //로그인한 유저의 게시글만
    query.where('board.userId = :userId', {userId: user.id});

    const boards = await query.getMany(); //다 가져와
    return boards;
  }
  async getBoardById(id: number): Promise <Board>{
    const found = await this.boardRepository.findOneBy({ id: id });

    if(!found){
      throw new NotFoundException(`Can\`t find Board with id ${id}`);
    }
    return found;
  }

  createBoard(createBoardDto : CreateBoardDto, user: User): Promise<Board>{
      return this.boardRepository.createBoard(createBoardDto, user);
  }

  async deleteBoard(id : number, user:User){
    const result =  await this.boardRepository.delete({id, user}); //기본제공되는 delete 사용
    if(result.affected ===0){ //영향받은게 0개 === 못찾은경우 예외처리
      throw new NotFoundException(`Can\`t find Board with id ${id}`);
    }
    return result;
  }

   async updateBoardStatus(id: number, status:BoardStatus): Promise<Board>{
    const board = await this.getBoardById(id);

    board.status=status;
    await this.boardRepository.save(board);

    return board;
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
