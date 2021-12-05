import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/entity/users.entity";
import { Repository } from "typeorm";
import * as dotenv from 'dotenv'
dotenv.config()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super({
            secretOrKey: process.env.JWT_SECRET_KEY,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validation(payload: any) {
        const {username} = payload;
        const user = await this.userRepository.findOne({username})

        if(!user) {
            throw new  UnauthorizedException();
        }

        return {
            user
        }
    }
}