import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './DTO/create-test';

@Injectable()
export class AppService {
  public async getHello(): Promise<string> {
    return `Hello`;
  }

  public async create(createTestDto:CreateTestDto):Promise<string>{
    const {name,age} = createTestDto
    return `${age} ${name}`;
  }
}
