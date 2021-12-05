import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv'
import { JwtStrategy } from 'src/middleware/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
dotenv.config()

@Module({
  imports: [
  PassportModule.register({ defaultStrategy: 'jwt'}),
  TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {expiresIn: '1h'}
  })
],
  providers: [UsersService, JwtStrategy],
  controllers: [UsersController],
  exports: [JwtStrategy, PassportModule]
})
export class UsersModule {}