import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { City } from "./City";
import { Address } from "./Address";
import { type } from "os";

@Entity({ name: "district" })
export class District {
    @PrimaryGeneratedColumn({ type: "integer" })
    id!: number

    @Column({ type: "character varying", length: 100 })
    name!: string

    @OneToMany(type => Address, district => District)
    addresses!: Address[]

    @ManyToOne(type => City, districts => District, { eager: true})
    city!: City
}