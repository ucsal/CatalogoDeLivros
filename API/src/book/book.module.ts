/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BooksService } from './book.service';
import { BooksController } from './book.controller';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { FavoriteModule } from 'src/favorite/favorite.module';

@Module({
  imports: [FavoriteModule],
  providers: [BooksService],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BookModule {}
