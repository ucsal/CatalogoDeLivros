/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { User } from './Entities/user.entity';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { SignupDto } from './Dtos/signup.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/createUser')
  async createUser(
    @Body() signupDto: SignupDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.userService.createUser(signupDto);
      res.status(HttpStatus.CREATED).json('User Successfully Created');
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/getAllUsers')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
