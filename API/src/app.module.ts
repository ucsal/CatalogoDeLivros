/* eslint-disable prettier/prettier */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './User/user.module';
import { AuthModule } from './Auth/auth.module';
import { AuthMiddleware } from './Auth/auth.middleware';
import { BookModule } from './book/book.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number[process.env.DB_PORT],
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migration/{*.js,.ts}`],
      migrationsRun: true,
    }),
    UserModule,
    AuthModule,
    BookModule,
    FavoriteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: 'books/getUserFavoriteBooks',
        method: RequestMethod.POST,
      },
      {
        path: 'books/loadBooks',
        method: RequestMethod.GET,
      },
      {
        path: 'books/search',
        method: RequestMethod.POST,
      },
      {
        path: 'books/addBook/:bookId/ToFavorites',
        method: RequestMethod.POST,
      },
      {
        path: 'books/removeBook/:bookId/FromFavorites',
        method: RequestMethod.DELETE,
      },
      {
        path: 'books/book/:bookId',
        method: RequestMethod.POST,
      },
      {
        path: 'favorites/addAnnotationToBook',
        method: RequestMethod.POST,
      },
      {
        path: 'favorites/isBookFavorite',
        method: RequestMethod.POST,
      },
    );
  }
}
