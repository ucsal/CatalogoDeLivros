/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './Entities/user.entity';
import { SignupDto } from './Dtos/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(signupDto: SignupDto) {
    try {
      const saltOrRounds = 10;
      const passwordHashed = await bcrypt.hash(
        signupDto.password,
        saltOrRounds,
      );
      return this.userRepository.save({
        ...signupDto,
        password: passwordHashed,
      });
    } catch (error) {
      if ((error.code = '23505')) {
        console.log('Email Already in use');
        throw new ConflictException('Email Already in use');
      }
      console.log('Error creating user');
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(username: string): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: {
          username,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error getting user by username');
    }
  }
}
