/* eslint-disable prettier/prettier */
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import authConfig from './auth.config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: NextFunction) => void) {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ message: 'JWT token não foi achado' });
    }
    const tokenWithoutQuotes = token.replace(/^"(.*)"$/, '$1');
    try {
      const decodedToken = jwt.verify(tokenWithoutQuotes, authConfig.jwtSecret);
      if (decodedToken) {
        req['user'] = { id: decodedToken.id };
        next();
      } else {
        throw new UnauthorizedException('Token Jwt invalido');
      }
    } catch (error) {
      throw new UnauthorizedException('Token JWT invalido');
    }
  }
}
