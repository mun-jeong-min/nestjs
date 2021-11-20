import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }
  @Get('/:id')
  findId(@Param('id') id: string): Board {
    return this.boardsService.findBoardById(id);
  }
  @Post('/')
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }
  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
      this.boardsService.deleteBoard(id)
  }
}
