import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'User'})
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string;

    @Column()
    password:string;

    @Column({type:'text',default:'secondary'})
    theme_color:string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt:Date;

    @UpdateDateColumn({name:'updated_at'})
    updatedAt:Date;
}
