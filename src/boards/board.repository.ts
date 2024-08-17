import { EntityRepository, Repository } from "typeorm";
import { Board } from "./board.entity";

@EntityRepository(Board) //Board를 컨트롤하는 db임을 선언
export class BoardRepository extends Repository<Board>{

}