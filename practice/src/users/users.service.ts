import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/users.entity';
import { Repository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';
import { hash,compare } from 'bcrypt';
import { loginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async getUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async signup({ id, password }: SignupDto) {

    await this.userRepository.save({
      id: id,
      password: await hash(password, 12),
    });
  }

  public async login(body: loginDto) {
      const admin = await this.userRepository.findOne({id: body.id})
      if(admin.id !== body.id){
          throw new NotFoundException();
      }
      await this.verify(body.password,admin.password)
      return {
          message: '로그인 성공'
      }
  }

  private async verify(password1:string, password2:string):Promise<void>{
      const match = await compare(password1,password2)
      if(!match){
          throw new NotFoundException();
      }
  }
}