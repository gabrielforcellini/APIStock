import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne } from "typeorm"
import { Address } from "./Address/Address"

@Entity({ name: "user"})
export class User {

    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 50})
    name!: string

    @Column({ type: "character varying", length: 50})
    lastname!: string

    @Column({ type: "character varying", length: 50})
    mail!: string

    @Column({ type: "character varying", length: 100})
    password!: string

    @Column({ type: "character varying", length: 20})
    telephone!: string

    @Column({ type: "timestamp without time zone", nullable: true})
    create_date?: Date

    @Column({ type: "timestamp without time zone", nullable: true})
    update_date?: Date

    @ManyToOne(() => Address, address => address.users)
    @JoinColumn()
    address!: Address
};