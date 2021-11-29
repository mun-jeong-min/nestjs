import { Body, Controller, Get, HttpCode, Param, Post, Redirect, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Redirect('https://nestjs.com', 301)
  @Get('/')
  public async getHello(): Promise<string> {
    return this.appService.getHello();
  }
  @Post('/res')
  @HttpCode(204)
  public async resHello(@Body('name') name:string): Promise<string> {
    return this.appService.resHello(name);
  }
}