export interface Board{
  id: string;
  title : string;
  description : string;
  status : BoardStatus; //private or public 만 올 수 있음
}

//enum => 값 제한
export enum BoardStatus{
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}