import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcryptjs'
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) //변수에 의존성 주입해줘
    private userRepository: UserRepository,
    private jwtService : JwtService
  )
  { }

  async signUp(autoCredentialsDto : AuthCredentialsDto){
    return this.userRepository.createUser(autoCredentialsDto);
  }

  async signIn(authCredentialDto : AuthCredentialsDto) {
    const {username, password} = authCredentialDto;
    const user = await this.userRepository.findOneBy({username});
    //username으로 user 찾고

    //입력받은 비밀번호랑 저장된 비밀번호랑 비교
    if(user && (await bcrypt.compare(password, user.password))){
      //유저 토큰 생성 (Secret + Payload)
      const payload = {username} //중요한정보 넣으면안됨
      const accessToken = await this.jwtService.sign(payload); //payload + secret해서 알아서 토큰만들어줌

      return { accessToken }; //객체로 리턴
    }
    else{
      throw new UnauthorizedException('login failed');
    }

  }
}
