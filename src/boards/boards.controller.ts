import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { Board, BoardStatus } from "./board.model";
import { CreateBoardDto } from "./dto/create-board.dto";

@Controller('boards')
export class BoardsController {
  constructor(private boardsService : BoardsService) { }

  @Get()
  getAllBoards() : Board[]{
    return this.boardsService.getAllBoards();
  }

  //생성은 post
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(    @Body() createBoardDto : CreateBoardDto) : Board{
    return this.boardsService.createBoard(createBoardDto);
  }

  //localhost:3030/boards/1234(id) 가져오는 방법 = @param
  @Get('/:id')
  getBoardByID(@Param('id') id:string) : Board{
    return this.boardsService.getBoardByID(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id:string) :void{
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status') //수정은 patch
  updateBoardStatus(@Param('id')id:string, @Body('status') status:BoardStatus){
    return this.boardsService.updateBoardStatus(id,status);
  }
}
