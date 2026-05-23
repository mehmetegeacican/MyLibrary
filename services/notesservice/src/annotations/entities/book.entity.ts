import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Annotation } from '../../annotations/entities/annotation.entity';

@Entity('books', { synchronize: false }) 
export class Book {
  @PrimaryColumn({ type: 'uuid' }) 
  uuid: string;           

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  authors: string; 

  @Column({ type: 'varchar', nullable: true })
  imagePath: string;

  @OneToMany(() => Annotation, (annotation) => annotation.book)
  annotations: Annotation[];
}