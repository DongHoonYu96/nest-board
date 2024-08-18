import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity"; //passport아님에 주의
import * as config from 'config';


@Injectable() //어디에서나 사용가능토록
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    @InjectRepository(UserRepository) //db사용해야 하므로 주입
    private userRepository : UserRepository
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET || config.get('jwt').secret, //검증용 시크릿키, 모듈에서 설정해준거랑 같은값
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() //Bearer토큰 타입으로 올거임
    })
  }

  async validate(payload){
    const {username} = payload;
    const user : User = await this.userRepository.findOneBy({username});

    if(!user){
      throw new UnauthorizedException();
    }

    return user;
  }
}