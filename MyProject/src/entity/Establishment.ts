import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { Address } from "./Address/Address";
import { Stock } from "./Stock";

@Entity({ name: "establishment" })
export class Establishment {
    @PrimaryColumn({ type: "integer" })
    id!: number

    @Column({ type: "character varying", length: 100 })
    name!: string

    @Column({ type: "character varying", length: 50 })
    code!: string

    @ManyToOne(type => Address, establishment => Establishment, {eager : true})
    @JoinColumn({ name: "address_id"})
    address!: Address

    @OneToMany(type => Stock, establishment => Establishment)
    stock: Stock[];
};