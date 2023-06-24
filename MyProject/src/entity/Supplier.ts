import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Address } from "./Address/Address";
import { Product } from "./Product";
import { array } from "joi";

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

    @ManyToOne(type => Address, supplier => Supplier, {eager: true})
    @JoinColumn({name: "address_id"})
    address!: Address

    @ManyToMany(type => Product, product => product.suppliers, { cascade: true})
    @JoinTable({ name: "supplier_product"})
    products: Product[];

    addProduct(product : Product){
        //if(this.products == null){
        //    this.products = new Array<Product>();
        //}
        this.products.push(product);
    }
};