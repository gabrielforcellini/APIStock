import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity({ name: "category"})
export class Category {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 20})
    code!: string

    @Column({ type: "character varying", length: 100, nullable: true})
    description?: string

    @OneToMany(type => Product, category => Category)
    products: Product[];
}