import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Stock_Product } from "./Stock_Product";
import { Stock } from "./Stock";

@Entity({ name: "product" })
export class Product {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 50 })
    name!: string

    @Column({ type: "character varying", length: 25, nullable: true })
    part_number?: string

    @Column({ type: "character varying", length: 50, nullable: true })
    bar_code?: string

    @Column({ type: "numeric", precision: 10, scale: 2 })
    buy_price!: number

    @Column({ type: "numeric", precision: 10, scale: 2 })
    sale_price!: number

    @Column({ type: "character varying", length: 50, nullable: true })
    brand?: string

    @Column({ type: "boolean", nullable: true })
    active_status?: boolean

    @Column({ type: "date", nullable: true })
    create_date?: Date

    @Column({ type: "date", nullable: true })
    update_date?: Date

    @ManyToOne(type => Category, products => Product)
    @JoinColumn({ name: "category_id"})
    category!: Category;

    @OneToMany(type => Stock_Product, stock => Stock)
    stock_product: Stock_Product
};