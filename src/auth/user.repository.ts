import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@Injectable()
export class UserRepository extends Repository<User>{
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto : AuthCredentialsDto){
    const {username, password} = authCredentialsDto;
    const user = this.create({username,password}); //리포지토리.create => db저장용객체로 만들어줌
    await this.save(user);
  }
}