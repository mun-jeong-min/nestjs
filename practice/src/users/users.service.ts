import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/users.entity';
import { Repository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async getUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async signup({ id, password }: SignupDto) {

    if(this.userRepository.findOne({id: id})) {
        throw new BadRequestException();
    }

    await this.userRepository.save({
      id: id,
      password: await hash(password, 12),
    });
  }
}
