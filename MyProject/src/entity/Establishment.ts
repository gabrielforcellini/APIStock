import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Address } from "./Address/Address";

@Entity({ name: "establishment"})
export class Establishment {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 100})
    name!: string

    @Column({ type: "character varying", length: 50})
    code!: string

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address
};