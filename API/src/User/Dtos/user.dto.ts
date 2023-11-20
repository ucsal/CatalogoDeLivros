/* eslint-disable prettier/prettier */
import { IsString, IsEmail } from "class-validator";

export class UserDto {

    @IsString()
    username: string;
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    @IsString()
    token: string;
}
