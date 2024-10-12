import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'Category'})
export class Category {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:String;

    @Column()
    user_id:number;

    @Column()
    info:string;

}

