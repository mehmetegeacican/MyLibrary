import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn, 
  VersionColumn,     
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Book } from './book.entity';

@Entity('annotations')
export class Annotation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true }) 
  userId: string;

  @Column({ type: 'uuid', nullable: true })
  bookId: string;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'integer', nullable: true })
  pageNumber: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedat: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @VersionColumn()
  version: number;

  @ManyToOne(() => Book, (book) => book.annotations)
  @JoinColumn({ name: 'bookId', referencedColumnName: 'uuid' })
  book: Book;


}