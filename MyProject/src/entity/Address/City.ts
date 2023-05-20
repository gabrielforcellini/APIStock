import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { State } from "./State";

@Entity({ name: "city" })
export class City {
    @PrimaryColumn({ type: "integer" })
    id!: number

    @Column({ type: "character varying", length: 100 })
    name!: string

    @OneToOne(() => State)
    @JoinColumn()
    city!: State
}