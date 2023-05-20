import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Category } from "./Category";
import { Supplier } from "./Supplier";

@Entity({ name: "product" })
export class Product {
    @PrimaryColumn({ type: "integer"})
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

    @OneToOne(() => Category, (category) => category.id)
    category!: Category

    @OneToMany(() => Supplier, (supplier) => supplier.id)
    supplier!: Supplier

    @Column({ type: "character varying", length: 50, nullable: true })
    brand?: string

    @Column({ type: "boolean", nullable: true })
    active_status?: boolean

    @Column({ type: "date", nullable: true })
    create_date?: Date

    @Column({ type: "date", nullable: true })
    update_date?: Date
};