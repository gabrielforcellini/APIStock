import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Establishment } from "./Establishment";
import { Stock_Product } from "./Stock_Product";

@Entity({ name: "stock"})
export class Stock {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 10})
    code!: string

    @Column({ type: "integer"})
    quantity!: number

    @ManyToOne(type => Establishment, stock => Establishment)
    @JoinColumn({ name: "establishment_id"})
    establishment: Establishment

    @OneToMany(type => Stock_Product, stock => Stock)
    stock_product: Stock_Product
}