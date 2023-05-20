import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "category"})
export class Category {
    @PrimaryColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 20})
    code!: string

    @Column({ type: "character varying", length: 100, nullable: true})
    description?: string
}