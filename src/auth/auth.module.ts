import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { JwtModule } from "@nestjs/jwt";
import {PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
  imports:[
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret:process.env.JWT_SECRET || jwtConfig.secret,
      signOptions:{
        expiresIn: jwtConfig.expiresIn,
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy], //해당 auth모듈에서 사용가능토록
  exports: [JwtStrategy, PassportModule] //다른 모듈에서 사용가능토록
})
export class AuthModule {}
