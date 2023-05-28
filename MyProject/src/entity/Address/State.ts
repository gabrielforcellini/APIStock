import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Country } from "./Country";
import { City } from "./City";

@Entity({ name: "state" })
export class State {
    @PrimaryGeneratedColumn({ type: "integer" })
    id!: number

    @Column({ type: "character varying", length: 100 })
    name!: string

    @Column({ type: "character varying", length: 5, nullable: true })
    initials?: string
    
    @OneToMany(type => City, state => State)
    cities!: City[]
    
    @ManyToOne(type => Country, states => State, {eager: true})
    country!: Country
}