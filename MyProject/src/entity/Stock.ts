import { Entity, Column, OneToMany, OneToOne, PrimaryColumn, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Establishment } from "./Establishment";
import { Category } from "./Category";

@Entity({ name: "stock"})
export class Stock {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 10})
    code!: string
   
    @OneToOne(() => Category)
    @JoinColumn({ name: "category_id"})
    category!: Category
}