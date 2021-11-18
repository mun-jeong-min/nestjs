import { Controller, Get } from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService){}

@Get('/')
getAllBoard(): Board[]{ // interface 시에는 배열 표시를 위해 타입지정 뒤에 [] 붙여준다
    return this.boardsService.getAllBoards();
}
}