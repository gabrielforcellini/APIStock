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
    
    @ManyToOne(type => District, addresses => Address)
    district!: District

    @OneToMany(type => Supplier, address => Address)
    supplier: Supplier

    @OneToMany(type => User, address => Address)
    users: User

    @OneToMany(type => Establishment, address => Address)
    establishment: Establishment
}