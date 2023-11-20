/* eslint-disable prettier/prettier */
import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';

export class ReturnBookDto {
  constructor(id: string, volumeInfo: any, isFavorite?: boolean) {
    this.id = id;
    this.volumeInfo = volumeInfo;
    this.isFavorite = isFavorite;
  }

  @IsString()
  id: string;

  @IsObject()
  volumeInfo: any;

  @IsBoolean()
  isFavorite: boolean;
}
