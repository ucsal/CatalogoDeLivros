/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  async getUserFavoritesBooksIds(userid: number): Promise<string[]> {
    try {
      const entityManager = this.favoriteRepository.manager;
      const query = 'SELECT bookid FROM favorites WHERE userid = $1;';
      const result = await entityManager.query(query, [userid]);
      if (result && result.length > 0) {
        const favoritesIds = result.map((item) => item.bookid);
        return favoritesIds;
      }
    } catch (error) {
      throw new InternalServerErrorException('User does not have favorites');
    }
  }

  async isBookFavorite(userId: number, bookId: string): Promise<boolean> {
    try {
      const booksIds = await this.getUserFavoritesBooksIds(userId);
      if (!booksIds || booksIds.length === 0) {
        throw new NotFoundException('User does not have favorites');
      }
      return booksIds.includes(bookId);
    } catch (error) {
      console.error(
        `Erro ao verificar se o livro é favorito: ${error.message}`,
      );
      return false;
    }
  }

  async addBookToFavorites(userId: number, bookId: string): Promise<any> {
    try {
      const entityManager = this.favoriteRepository.manager;
      const emptyAnnotations = [];
      const query =
        'INSERT INTO favorites (userid, bookid, annotations) VALUES ($1, $2, $3);';
      const result = await entityManager.query(query, [
        userId,
        bookId,
        emptyAnnotations,
      ]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async removeBookFromFavorites(userId: number, bookId: string): Promise<any> {
    try {
      const entityManager = this.favoriteRepository.manager;
      const query = 'DELETE FROM favorites WHERE userid = $1 AND bookid = $2;';
      const result = await entityManager.query(query, [userId, bookId]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addAnnotationsToBook(
    annotation: string,
    userId: number,
    bookId: string,
  ): Promise<any> {
    try {
      const entityManager = this.favoriteRepository.manager;
      const query = `UPDATE favorites SET annotations = annotations || $1 WHERE userid = $2 AND bookid = $3;`;
      const result = await entityManager.query(query, [
        [annotation],
        userId,
        bookId,
      ]);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUserAnnotations(userId: number, bookId: string): Promise<any> {
    try {
      const entityManager = this.favoriteRepository.manager;
      const query = `SELECT annotations FROM favorites WHERE userid = $1 AND bookid = $2;`;
      const result = await entityManager.query(query, [userId, bookId]);
      if (result && result.length > 0) {
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
