import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { District } from "./District";
import { User } from "../User";

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
    
    @ManyToOne(() => District, (district) => district.addresses)
    district!: District

    @OneToMany(() => User, user => user.address)
    users: User[];
}