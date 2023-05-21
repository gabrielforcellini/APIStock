import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Establishment } from "./Establishment";
import { Category } from "./Category";
import { Product } from "./Product";

@Entity({ name: "stock"})
export class Stock {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 10})
    code!: string

    @Column({ type: "integer"})
    quantity!: number

    @ManyToOne(() => Establishment, (establishment) => establishment.stocks)
    establishment!: Establishment

    @ManyToMany(() => Product, (product) => product.stocks)
    @JoinTable()
    product!: Product

    @ManyToOne(() => Category, (category) => category.stocks)
    category!: Category
}