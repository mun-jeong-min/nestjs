import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entity/users.entity';
import { loginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async getUser(): Promise<User[]> {
    return await this.usersService.getUser();
  }

  @Post('signup')
  public async signup(@Body() body: SignupDto): Promise<void> {
    await this.usersService.signup(body);
  }
  
  @Post('login')
  async login(@Body() body: loginDto){
    return await this.usersService.login(body)
  }

  @Post('authTest')
  authTest(@Req() req) {
      console.log(req)
  }
}