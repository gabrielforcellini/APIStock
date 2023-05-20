import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Supplier } from "./Supplier";

@Entity({ name: "produto"})
export class Product {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 50})
    name!: string

    @Column({type: "character varying", length: 25, nullable: true})
    part_number?: string

    @Column({ type: "character varying", length:50, nullable: true})
    bar_code?: string

    @Column({ type: "numeric", length:10, scale: 2})
    buy_price!: number

    @Column({ type: "numeric", length:10, scale: 2})
    sale_price!: number

    @OneToOne(()=> Category)
    @JoinColumn()
    category!: Category

    @OneToOne(()=> Supplier)
    @JoinColumn()
    supplier!: Supplier

    @Column({ type: "date", nullable: true})
    create_date?: Date

    @Column({ type: "date", nullable: true})
    update_date?: Date
};