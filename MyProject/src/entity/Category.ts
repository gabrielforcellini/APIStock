import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "category"})
export class Category {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 20})
    code!: string

    @Column({ type: "character varying", length: 100, nullable: true})
    description?: string
}