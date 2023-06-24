import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm"
import { Establishment } from "./Establishment"

@Entity({ name: "preferences"})
export class Preferences {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 20})
    theme!: string

    @Column({ type: "character varying", length: 30})
    language!: string

    @OneToOne(type => Establishment, establishment => Establishment, {eager: true})
    @JoinColumn({ name : "establishment_id"})
    establishment!: Establishment
};