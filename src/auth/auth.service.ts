import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) //변수에 의존성 주입해줘
    private userRepository: UserRepository) {
  }

  async signUp(autoCredentialsDto : AuthCredentialsDto){
    return this.userRepository.createUser(autoCredentialsDto);
  }
}
