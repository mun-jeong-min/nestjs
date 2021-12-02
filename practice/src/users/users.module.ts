import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv'
dotenv.config()

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {expiresIn: '1h'}
  })
],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}