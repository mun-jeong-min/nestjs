import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/users.entity';
import { Repository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';
import { hash,compare } from 'bcrypt';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  public async getUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async signup({ id, password, username }: SignupDto) {

    await this.userRepository.save({
    username: username,
    id: id,
    password: await hash(password, 12)
    });
  }

  public async login(body: loginDto){
      const admin = await this.userRepository.findOne({id: body.id})
      if(admin.id !== body.id){
          throw new NotFoundException();
      }
      
      await this.verify(body.password,admin.password)
      
      const payload = {admin}
      const accessToken = await this.jwtService.sign(payload);
      
      return {
          message: '로그인 성공',
          accessToken
      }
  }

  private async verify(password1:string, password2:string):Promise<void>{
      const match = await compare(password1,password2)
      if(!match){
          throw new NotFoundException();
      }
  }
}