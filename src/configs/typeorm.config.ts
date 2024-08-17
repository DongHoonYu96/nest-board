import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'], //엔티티 파일이 어디있는지(엔티티 이용해서 db table 생성함)
  synchronize: true //true -> app 재실행시, 수정된 컬럼의 테이블 drop후 재생성
}