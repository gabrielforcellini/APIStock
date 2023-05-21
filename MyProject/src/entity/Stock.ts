import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Establishment } from "./Establishment";
import { StockItem } from "./StockItem";

@Entity({ name: "stock"})
export class Stock {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 10})
    code!: string

    @Column({ type: "integer"})
    quantity!: number

    @ManyToOne(() => Establishment)
    @JoinColumn()
    establishment!: Establishment

    @OneToMany(() => StockItem, stockItem => stockItem.stock)
    stockItems: StockItem[];
}