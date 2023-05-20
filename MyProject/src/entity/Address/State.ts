import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Country } from "./Country";

@Entity({ name: "state" })
export class State {
    @PrimaryColumn({ type: "integer" })
    id!: number

    @Column({ type: "character varying", length: 100 })
    name!: string

    @Column({ type: "character varying", length: 5, nullable: true })
    initials?: string

    @OneToOne(() => Country)
    @JoinColumn()
    city!: Country
}