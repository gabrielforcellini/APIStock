import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { State } from "./State";
import { District } from "./District";

@Entity({ name: "city" })
export class City {
    @PrimaryGeneratedColumn({ type: "integer" })
    id!: number

    @Column({ type: "character varying", length: 100 })
    name!: string

    @ManyToOne(() => State, (state) => state.cities)
    state!: State

    @OneToMany(() => District, (district) => district.city)
    districts!: District[]
}