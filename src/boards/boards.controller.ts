import {
  Body,
  Controller,
  Delete,
  Get, Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post, UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { BoardStatus } from "./board-statuss.enum.";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatusValidationPipe } from "./pipes/board-status-validation.pipe";
import { Board } from "./board.entity";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../auth/user.entity";

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardController');
  constructor(private boardsService : BoardsService) { }

  @Get()
  getAllBoard(@GetUser() user : User){
    this.logger.verbose(`User ${user.username} trying to get all boards`);
    return this.boardsService.getAllBoards(user);
  }

  @Get('/:id')
  getBoardById(@Param('id') id:number) : Promise <Board> {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto : CreateBoardDto, @GetUser() user : User) : Promise<Board> {
    this.logger.verbose(`User ${user.username} creating a new board, Payload : ${JSON.stringify(createBoardDto)}`);
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number , @GetUser() user : User){ //제공되는 파이프로 검사해주시고
    return this.boardsService.deleteBoard(id, user);
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
