/* eslint-disable prettier/prettier */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/User/user.service';
import { SignInDto } from './Dtos/signIn.dto';
import * as bcrypt from 'bcrypt';
import authConfig from './auth.config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    try {
      // const user = await this.userService.findOne(signInDto.username);
      // if (!user) {
      //   return undefined;
      // }

      // const isPasswordValid = await bcrypt.compare(
      //   signInDto.password,
      //   user.password,
      // );

      // if (!isPasswordValid) {
      //   throw new UnauthorizedException('Invalid Credentials');
      // }

      const tokenPayload = {
        username: signInDto.username,
      };

      const token = jwt.sign(tokenPayload, authConfig.jwtSecret, {
        expiresIn: '24h',
      });
      return { token };
    } catch (error) {
      console.error('Error during sign-in:', error);
      throw new UnauthorizedException('Error during sign-in process');
    }
  }
}
