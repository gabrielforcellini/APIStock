import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Stock } from "./Stock";

@Entity({ name: "category"})
export class Category {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 20})
    code!: string

    @Column({ type: "character varying", length: 100, nullable: true})
    description?: string

    @OneToMany(() => Product, (product) => product.category)
    product: Product[]

    @OneToMany(() => Stock, (stock) => stock.category)
    stocks: Stock[]
}