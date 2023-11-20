/* eslint-disable prettier/prettier */
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'username', nullable: false })
  username: string;

  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'created_at' })
  created_at: Date;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];
}
