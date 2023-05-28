import { Entity, Column,  PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { State } from "./State";

@Entity({ name: "country" })
export class Country {
    @PrimaryGeneratedColumn({ type: "integer" })
    id!: number

    @Column({ type: "character varying", length: 100 , unique: true})
    name!: string

    @Column({ type: "character varying", length: 5, nullable: true , unique: true})
    initials?: string

    @OneToMany(type => State, country => Country)
    states: State[]
}