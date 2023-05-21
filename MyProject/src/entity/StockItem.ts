import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { Stock } from "./Stock";

@Entity()
export class StockItem {
    @PrimaryGeneratedColumn({ type: "integer"})
    id: number;

    @Column({ type: "integer"})
    quantity: number;

    @ManyToOne(() => Product, product => product.stockItems)
    product!: Product;

    @ManyToOne(() => Stock, stock => stock.stockItems)
    stock!: Stock;
}