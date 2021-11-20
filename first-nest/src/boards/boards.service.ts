import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  public getAllBoards(): Board[] {
    return this.boards;
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
      return this.boards.find((board) => board.id === id)
  }
  
  public deleteBoard(id: string): void {
      this.boards = this.boards.filter((board) => board.id !== id)
  }
  
  public updateStatus(id:string, status:BoardStatus): Board {
      const board = this.findBoardById(id)
      board.status = status
      return board;
  }
}
