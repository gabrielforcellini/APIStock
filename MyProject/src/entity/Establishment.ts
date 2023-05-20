import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "estabelecimento"})
export class Establishment {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 100})
    nome!: string

    @Column({ type: "character varying", length: 100, nullable: true})
    nome_fonetica?: string

    @Column({ type: "character varying", length: 20, nullable: true})
    cnpj?: string

    @Column({ type: "text", nullable: true})
    descricao?: string

    @Column({ type: "character varying", length: 20, nullable: true})
    celular?: string

    @Column({ type: "character varying", length: 100, nullable: true})
    email?: string

    @Column({ type: "integer"})
    endereco_id!: number
}