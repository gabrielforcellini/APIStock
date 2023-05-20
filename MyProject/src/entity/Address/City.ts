import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { State } from "./State";

@Entity({ name: "city"})
export class City {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 100})
    name!: string

    @OneToOne(() => State)
    @JoinColumn()
    city!: State
}