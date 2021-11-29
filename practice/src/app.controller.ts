import { Body, Controller, Get, HostParam, HttpCode, Param, Post, Redirect, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTestDto } from './DTO/create-test';


@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Post('/')
  async create(@Body() CreateTestDto:CreateTestDto){
    return this.appService.create(CreateTestDto)
  }
}