import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: "usuario"})
export class User {

    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 50})
    nome!: string

    @Column({ type: "character varying", length: 50})
    sobrenome!: string

    @Column({ type: "character varying", length: 50})
    email!: string

    @Column({ type: "character varying", length: 100})
    senha!: string

    @Column({ type: "character varying", length: 20})
    telefone!: string

    @Column({ type: "integer"})
    endereco_id!: number

    @Column({ type: "timestamp without time zone", nullable: true})
    data_criacao?: Date

    @Column({ type: "timestamp without time zone", nullable: true})
    data_atualizacao?: Date
};