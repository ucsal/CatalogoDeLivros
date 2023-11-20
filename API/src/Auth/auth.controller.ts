/* eslint-disable prettier/prettier */
import {
  Controller,
  HttpStatus,
  Post,
  HttpCode,
  Body,
  Res,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './Dtos/signIn.dto';
import { AuthMiddleware } from './auth.middleware';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    try {
      const token = await this.authService.signIn(signInDto);

      if (token) {
        return res.status(HttpStatus.OK).json({ token });
      } else {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'Invalid Crendetials' });
      }
    } catch (error) {
      console.error('Error during login process:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error during login process' });
    }
  }

  @Post('/isUserAuthenticated')
  @UseGuards(AuthMiddleware)
  async isUserAuthenticated(@Req() req: Request): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      return false;
    }
  }
}
