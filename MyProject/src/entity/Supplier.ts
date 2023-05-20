import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Address } from "./Address/Address";

@Entity({ name: "fornecedor"})
export class Supplier {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 100})
    nome!: string

    @Column({ type: "character varying", length: 20, nullable: true})
    telephone?: string

    @Column({ type: "character varying", length: 100, nullable: true})
    mail?: string

    @OneToOne(() => Address)
    @JoinColumn()
    address!: Address

    @Column({ type: "character varying", length: 100, nullable: true})
    fantasy_name?: string

    @Column({ type: "boolean", nullable: true})
    active_status?: boolean
};