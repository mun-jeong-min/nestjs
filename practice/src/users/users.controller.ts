import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/entity/users.entity';
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
}