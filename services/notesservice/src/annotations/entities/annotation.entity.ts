import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('annotations')
export class Annotation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: true }) 
  userId: string;

  @Column({ type: 'varchar', nullable: true })
  bookId: string;

  @Column({ type: 'text', nullable: true }) 
  comment: string;

  @Column({ type: 'integer', nullable: true }) 
  pageNumber: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedat:Date;
}