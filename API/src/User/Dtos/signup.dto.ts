/* eslint-disable prettier/prettier */
import { IsString, IsEmail } from 'class-validator';

export class SignupDto {
  @IsString()
  username: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
