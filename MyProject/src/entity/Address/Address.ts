import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { District } from "./District";
import { User } from "../User";
import { Supplier } from "../Supplier";
import { Establishment } from "../Establishment";

@Entity({ name: "address" })
export class Address {
    @PrimaryGeneratedColumn({ type: "integer" })
    id!: number

    @Column({ type: "character varying", length: 100 })
    street!: string

    @Column({ type: "character varying", length: 10 })
    number?: string

    @Column({ type: "character varying", length: 10 })
    zip_code?: string
    
    @ManyToOne(type => District, addresses => Address, {eager: true})
    district!: District

    @OneToOne(type => Supplier, address => Address)
    supplier: Supplier

    @OneToOne(type => User, address => Address)
    users: User

    @OneToOne(type => Establishment, address => Address)
    establishment: Establishment
}