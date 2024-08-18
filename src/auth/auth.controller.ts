import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {} //서비스만 사용해야함에 주의

  @Post('/signup')
  signUp(@Body() authCredentialsDto : AuthCredentialsDto){
    return this.authService.signUp(authCredentialsDto);
  }
}
