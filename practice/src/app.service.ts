import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  public async getHello(): Promise<string> {
    return await '문정민 웹사이트';
  }
}