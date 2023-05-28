import { Entity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Stock } from "./Stock";
import { Product } from "./Product";

@Entity({ name: "stock_product"})
export class Stock_Product {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number
    
    @Column({ type: "integer"})
    quantity!: number
    
    @ManyToOne(type => Stock, stock_product => Stock_Product)
    @JoinColumn({ name: "stock_id"})
    stock: Stock

    @ManyToOne(type => Product, stock_product => Stock_Product)
    @JoinColumn({ name: "product_id"})
    product: Product
}