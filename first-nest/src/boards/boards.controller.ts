import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  async getAllBoard(): Promise<Board[]> {
    return await this.boardsService.getAllBoards();
  }

  @Get('/:id')
  async findBoardById(@Param('id') id: string):Promise<Board> {
    return this.boardsService.findBoardById(id)
  }
  
  @Post('/')
  @UsePipes(ValidationPipe)
  async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Delete('/:id')
  async deleteBoard(@Param('id') id: string): Promise<void> {
      this.boardsService.deleteBoard(id)
  }
  
  @Patch('/:id')
  async updateStatus(
      @Param('id') id:string,
      @Body('status') status:BoardStatus
  ){
      return this.boardsService.updateStatus(id, status);
  }
}
