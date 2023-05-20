import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Address } from "./Address/Address";

@Entity({ name: "establishment" })
export class Establishment {
    @PrimaryColumn({ type: "integer" })
    id!: number

    @Column({ type: "character varying", length: 100 })
    name!: string

    @Column({ type: "character varying", length: 50 })
    code!: string

    @OneToOne(() => Address, (address) => address.id)
    @JoinColumn()
    address: Address
};