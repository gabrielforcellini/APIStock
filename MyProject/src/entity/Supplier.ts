import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
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

    @Column({ type: "character varying", length: 100, nullable: true})
    mail?: string

    @Column({ type: "character varying", length: 20})
    cnpj!: string
    
    @Column({ type: "boolean", nullable: true})
    active_status?: boolean

    @OneToOne(() => Address)
    @JoinColumn()
    address!: Address
};