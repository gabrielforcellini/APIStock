import { Entity, Column,  PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { State } from "./State";

@Entity({ name: "country" })
export class Country {
    @PrimaryGeneratedColumn({ type: "integer" })
    id!: number

    @Column({ type: "character varying", length: 100 })
    name!: string

    @Column({ type: "character varying", length: 5, nullable: true })
    initials?: string

    @OneToMany(() => State, (state) => state.country)
    states: State[]
}