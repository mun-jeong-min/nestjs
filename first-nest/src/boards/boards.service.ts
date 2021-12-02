import { Injectable, NotFoundException, Sse } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];
  
  public async getAllBoards(): Promise<Board[]> {
    return await this.boards;
  }
  
  public createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }
  
  public findBoardById(id: string): Board {
    const found = this.boards.find((board) => board.id === id);

    if(!found){
      throw new NotFoundException(`can't find id: ${id}`)
    }

    return found;
  }

  public deleteBoard(id: string): void {
    const found = this.findBoardById(id)
    this.boards = this.boards.filter((board) => board.id !== found.id); 
  }

  public updateStatus(id: string, status: BoardStatus): Board {
    const board = this.findBoardById(id);
    board.status = status;
    return board;
  }
}
