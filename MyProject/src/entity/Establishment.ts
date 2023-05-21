import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
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

    @OneToOne(() => Address)
    @JoinColumn()
    address!: Address

    @OneToMany(() => Stock, (stock) => stock.establishment)
    @JoinTable()
    stocks: Stock[]
};