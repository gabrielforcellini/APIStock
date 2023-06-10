import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Address } from "./Address/Address";
import { Stock } from "./Stock";
import { User } from "./User";

@Entity({ name: "establishment" })
export class Establishment {
    @PrimaryGeneratedColumn({ type: "integer" })
    id: number

    @Column({ type: "character varying", length: 100 })
    name: string

    @Column({ type: "character varying", length: 50 })
    code: string

    @ManyToOne(type => Address, establishment => Establishment)
    @JoinColumn({ name: "address_id"})
    address: Address

    @OneToMany(type => User, establishment => Establishment)
    user: User[];

    @OneToMany(type => Stock, establishment => Establishment)
    stock: Stock[];
};