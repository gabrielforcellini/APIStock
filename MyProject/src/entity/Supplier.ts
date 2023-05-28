import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Address } from "./Address/Address";
import { Product } from "./Product";

@Entity({ name: "supplier"})
export class Supplier {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 100})
    name!: string

    @Column({ type: "character varying", length: 100, nullable: true})
    fantasy_name?: string

    @Column({ type: "character varying", length: 20, nullable: true})
    telephone?: string

    @Column({ type: "character varying", length: 100, nullable: true, unique: true})
    mail?: string

    @Column({ type: "character varying", length: 20})
    cnpj!: string
    
    @Column({ type: "boolean", nullable: true})
    active_status?: boolean

    @OneToOne(type => Address, supplier => Supplier, {eager: true})
    @JoinColumn({name: "address_id"})
    address!: Address

    @ManyToMany(type => Product)
    @JoinTable({name: "supplier_product"})
    products: Product;
};