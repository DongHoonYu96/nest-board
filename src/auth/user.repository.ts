import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<User>{
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto : AuthCredentialsDto){
    const {username, password} = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({username,password : hashedPassword}); //리포지토리.create => db저장용객체로 만들어줌

    try {
      await this.save(user);
    } catch (error){
      if(error.code==='23505'){
        throw new ConflictException('Existing username');
      }
      else{
        throw new InternalServerErrorException();
      }
    }
  }
}