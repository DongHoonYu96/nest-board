import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-statuss.enum.";

export class BoardStatusValidationPipe implements PipeTransform{
  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toUpperCase();
    if(!this.isStatusValid(value)){
      throw new BadRequestException('${value} isn`t in the status options');
    }
    return value;
  }

  //get 전용 멤버변수
  readonly StatusOptions=[
    BoardStatus.PUBLIC,
    BoardStatus.PRIVATE
  ];


  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1 ;
  }
}