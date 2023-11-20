/* eslint-disable prettier/prettier */
import { User } from 'src/User/Entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'favorites' })
export class Favorite {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: 'userid' })
  user: User;

  @Column()
  bookid: string;

  @Column({ name: 'annotations', nullable: true })
  annotations: string;
}
