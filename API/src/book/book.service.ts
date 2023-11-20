/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ReturnBookDto } from './Dtos/returnBook.dto';
import { FavoriteService } from 'src/favorite/favorite.service';

@Injectable()
export class BooksService {
  constructor(private readonly favoriteService: FavoriteService) {}

  async loadBooks(query: string, userId: number) {
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      if (response.data.items && response.data.items.length > 0) {
        const maxResults = 10;

        const mappedResultsPromises = response.data.items
          .slice(0, maxResults)
          .map(async (item) => {
            const isFavorite = await this.favoriteService.isBookFavorite(
              userId,
              item.id,
            );
            const returnDto = new ReturnBookDto(
              item.id,
              item.volumeInfo,
              isFavorite,
            );
            return returnDto;
          });
        const mappedResults = await Promise.all(mappedResultsPromises);
        return mappedResults;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error('Falha ao buscar livros da API de livros');
    }
  }

  async search(query: string, userId: number) {
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      if (response.data.items && response.data.items.length > 0) {
        const maxResults = 10;

        const mappedResultsPromises = response.data.items
          .slice(0, maxResults)
          .map(async (item) => {
            const isFavorite = await this.favoriteService.isBookFavorite(
              userId,
              item.id,
            );
            const returnDto = new ReturnBookDto(
              item.id,
              item.volumeInfo,
              isFavorite,
            );
            return returnDto;
          });
        const mappedResults = await Promise.all(mappedResultsPromises);
        return mappedResults;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error('Falha ao buscar livros da API de livros');
    }
  }

  async getUserFavoriteBooks(favorites): Promise<ReturnBookDto[]> {
    const apiUrl = 'https://www.googleapis.com/books/v1/volumes';
    try {
      // const booksIds = await this.favoriteService.getUserFavoritesBooksIds(
      //   userid,
      // );
      const bookPromises = favorites.map(async (element) => {
        try {
          const response = await axios.get(`${apiUrl}/${element}`);
          const bookData = response.data;
          return new ReturnBookDto(bookData.id, bookData.volumeInfo, true);
        } catch (error) {
          console.error(`Erro ao buscar livro ${element}: ${error.message}`);
          return null;
        }
      });
      const books = await Promise.all(bookPromises);
      return books;
    } catch (error) {
      console.error(
        `Erro ao buscar IDs de livros favoritos do usuário: ${error.message}`,
      );
      throw new Error('Erro ao buscar livros favoritos do usuário');
    }
  }

  async gotToBookPage(userId: number, bookId: string): Promise<any> {
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`;
    try {
      const response = await axios.get(apiUrl);
      const bookData = response.data;
      const isFavorite = await this.favoriteService.isBookFavorite(
        userId,
        bookData.id,
      );
      const bookAnnotations = await this.favoriteService.getUserAnnotations(
        userId,
        bookId,
      );
      return {
        ...new ReturnBookDto(bookData.id, bookData.volumeInfo, isFavorite),
        bookAnnotations,
      };
    } catch (error) {
      console.log('Error getting book information');
      throw new Error('Erro getting book information');
    }
  }
}
