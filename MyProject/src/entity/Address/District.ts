import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { City } from "./City";

@Entity({ name: "district" })
export class District {
    @PrimaryColumn({ type: "integer" })
    id!: number

    @Column({ type: "character varying", length: 100 })
    name!: string

    @OneToOne(() => City)
    @JoinColumn()
    city!: City
}