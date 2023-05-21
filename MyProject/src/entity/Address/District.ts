import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { City } from "./City";
import { Address } from "./Address";

@Entity({ name: "district" })
export class District {
    @PrimaryGeneratedColumn({ type: "integer" })
    id!: number

    @Column({ type: "character varying", length: 100 })
    name!: string

    @ManyToOne(() => City, (city) => city.districts)
    city!: City

    @OneToMany(() => Address, (address) => address.district)
    addresses!: Address[]
}