import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'notes'})
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId:number;

    @Column({type:'text',default:'Untitled'})
    title:string;

    @Column({type:'text', nullable:true})
    content:string;

    @Column({type:'text', default:''})  // New column for image path
    imagePath: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt:Date;

    @UpdateDateColumn({name:'updated_at'})
    updatedAt:Date;
}
