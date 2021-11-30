import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  public async getAllBoard(): Promise<Board[]> {
    return await this.boardsService.getAllBoards();
  }

  @Get('/:id')
  findBoardById(@Param('id') id: string): Board {
    return this.boardsService.findBoardById(id);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
      this.boardsService.deleteBoard(id)
  }
  
  @Patch('/:id')
  updateStatus(
      @Param('id') id:string,
      @Body('status') status:BoardStatus
  ){
      return this.boardsService.updateStatus(id, status);
  }
}
