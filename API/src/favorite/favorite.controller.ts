/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Favorite } from './entities/favorite.entity';
import { Request, Response } from 'express';

import { AuthMiddleware } from 'src/Auth/auth.middleware';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('/addAnnotationToBook')
  @UseGuards(AuthMiddleware)
  async addAnnotationsToBook(
    @Body() requestBody: { annotation: string; bookId: string },
    @Req() req: Request,
  ): Promise<any> {
    try {
      const userId = req['user'].id;
      return await this.favoriteService.addAnnotationsToBook(
        requestBody.annotation,
        userId,
        requestBody.bookId,
      );
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(
        'Error during addition of annotation to book',
      );
    }
  }

  @Post('/isBookFavorite')
  @UseGuards(AuthMiddleware)
  async isBookFavorite(
    @Body() requestBody: { bookId: string },
    @Req() req: Request,
  ): Promise<any> {
    try {
      const userId = req['user'].id;
      return await this.favoriteService.isBookFavorite(
        userId,
        requestBody.bookId,
      );
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Error in checkout of favorite state');
    }
  }
}
