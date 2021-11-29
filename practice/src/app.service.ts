import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public async getHello(): Promise<string> {
    return 'Hello World!';
  }

  public async resHello(name:string):Promise<string> {
    return `Hello ${name}`
  }
}
