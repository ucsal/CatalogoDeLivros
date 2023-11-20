/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { BooksService } from './book.service';
import { AuthMiddleware } from 'src/Auth/auth.middleware';
import { Request, Response } from 'express';
import { FavoriteService } from 'src/favorite/favorite.service';
@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly favoriteService: FavoriteService,
  ) {}

  @Get('loadBooks')
  @UseGuards(AuthMiddleware)
  async loadBooks(@Req() req: Request) {
    const searchTerms = [
      'Fantasia',
      'Aventura',
      'Ação',
      'Suspense',
      'Histórico',
      'Filosofia',
      'Programação',
    ];
    try {
      const userId = req['user'].id;
      const randomIndex = Math.floor(Math.random() * searchTerms.length);
      const searchTerm = searchTerms[randomIndex];
      return await this.booksService.loadBooks(searchTerm, userId);
    } catch (error) {
      console.error('Error during books loading:', error);
      throw new UnauthorizedException('Error during books loading process');
    }
  }

  @Post('/search')
  @UseGuards(AuthMiddleware)
  async search(@Body() searchData: { query: string }, @Req() req: Request) {
    try {
      const userId = req['user'].id;
      const searchTerm = searchData.query;
      return await this.booksService.search(searchTerm, userId);
    } catch (error) {
      console.error('Error during search:', error);
      throw new UnauthorizedException('Error during search process');
    }
  }

  @Post('/getUserFavoriteBooks')
  @UseGuards(AuthMiddleware)
  async getUserFavoritesTest(
    @Req() req: Request,
    @Body('favorites') favorites: any[],
  ): Promise<any> {
    try {
      return await this.booksService.getUserFavoriteBooks(favorites);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(
        'Error during getting user favorites process',
      );
    }
  }

  @Post('/addBook/:bookId/ToFavorites')
  @UseGuards(AuthMiddleware)
  async addBookToFavorites(
    @Param('bookId') bookId: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const userId = req['user'].id;
      await this.favoriteService.addBookToFavorites(userId, bookId);
      res
        .status(HttpStatus.CREATED)
        .json({ message: 'Book Successfully Added To Your Favorites' });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(
        'Error during adding book to user favorites process',
      );
    }
  }

  @Delete('/removeBook/:bookId/FromFavorites')
  @UseGuards(AuthMiddleware)
  async removeBookFromFavorites(
    @Param('bookId') bookId: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const userId = req['user'].id;
      await this.favoriteService.removeBookFromFavorites(userId, bookId);
      res
        .status(HttpStatus.NO_CONTENT)
        .json({ message: 'Book Successfully Removed From Your Favorites' });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(
        'Error during removing book to user favorites process',
      );
    }
  }

  @Get('/book/:bookId')
  @UseGuards(AuthMiddleware)
  async goToBookScreen(
    @Req() req: Request,
    @Param('bookId') bookId: string,
  ): Promise<any> {
    const userId = req['user'].id;
    try {
      return await this.booksService.gotToBookPage(userId, bookId);
    } catch (error) {
      console.log('Error getting information to book data');
      throw new UnauthorizedException(
        'Error during getting book information process',
      );
    }
  }
}
