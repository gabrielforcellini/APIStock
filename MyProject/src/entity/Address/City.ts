import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { State } from "./State";
import { District } from "./District";

@Entity({ name: "city" })
export class City {
    @PrimaryGeneratedColumn({ type: "integer" })
    id!: number

    @Column({ type: "character varying", length: 100 })
    name!: string

    @OneToMany(type => District, city => City)
    districts!: District[]

    @ManyToOne(type => State, cities => City, {eager: true})
    state!: State
}