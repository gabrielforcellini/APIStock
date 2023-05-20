import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { Establishment } from "./Establishment";
import { Category } from "./Category";

@Entity({ name: "stock"})
export class Stock {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @OneToMany(() => Establishment, (establishment) => establishment.id)
    establishment!: Establishment

    @Column({ type: "character varying", length: 10})
    code!: string

    @OneToOne(() => Category, (category) => category.id)
    category!: Category
}