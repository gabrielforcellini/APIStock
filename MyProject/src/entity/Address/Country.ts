import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "country" })
export class Country {
    @PrimaryColumn({ type: "integer" })
    id!: number

    @Column({ type: "character varying", length: 100 })
    name!: string

    @Column({ type: "character varying", length: 5, nullable: true })
    initials?: string
}