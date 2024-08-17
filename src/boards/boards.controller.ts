import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { Board } from "./board.model";
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
  createBoard(    @Body() createBoardDto : CreateBoardDto) : Board{
    return this.boardsService.createBoard(createBoardDto);
  }

  //www.sdfasdf?id=1234 가져오는 방법 = @param
  @Get('/:id')
  getBoardByID(@Param('id') id:string) : Board{
    return this.boardsService.getBoardByID(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id:string) :void{
    return this.boardsService.deleteBoard(id);
  }
}
