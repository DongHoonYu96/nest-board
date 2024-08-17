import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { BoardStatus } from "./board-statuss.enum.";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatusValidationPipe } from "./pipes/board-status-validation.pipe";
import { Board } from "./board.entity";

@Controller('boards')
export class BoardsController {
  constructor(private boardsService : BoardsService) { }

  @Get('/:id')
  getBoardById(@Param('id') id:number) : Promise <Board> {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto : CreateBoardDto) : Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number){ //제공되는 파이프로 검사해주시고
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status') //수정은 patch
  updateBoardStatus(@Param('id', ParseIntPipe) id:number, @Body('status', BoardStatusValidationPipe) status:BoardStatus){
    return this.boardsService.updateBoardStatus(id,status);
  }
  // @Get()
  // getAllBoards() : Board[]{
  //   return this.boardsService.getAllBoards();
  // }
  //
  // //생성은 post
  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(    @Body() createBoardDto : CreateBoardDto) : Board{
  //   return this.boardsService.createBoard(createBoardDto);
  // }
  //
  // //localhost:3030/boards/1234(id) 가져오는 방법 = @param
  // @Get('/:id')
  // getBoardByID(@Param('id') id:string) : Board{
  //   return this.boardsService.getBoardByID(id);
  // }
  //
  // @Delete('/:id')
  // deleteBoard(@Param('id') id:string) :void{
  //   return this.boardsService.deleteBoard(id);
  // }
  //
  // @Patch('/:id/status') //수정은 patch
  // updateBoardStatus(@Param('id')id:string, @Body('status', BoardStatusValidationPipe) status:BoardStatus){
  //   return this.boardsService.updateBoardStatus(id,status);
  // }
}
