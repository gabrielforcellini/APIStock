import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { District } from "./District";

@Entity({ name: "address"})
export class Address {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 100})
    street!: string

    @Column({ type: "character varying", length: 10})
    number?: string

    @Column({ type: "character varying", length: 10})
    zip_code?: string

    @OneToOne(() => District)
    @JoinColumn()
    district!: District
}