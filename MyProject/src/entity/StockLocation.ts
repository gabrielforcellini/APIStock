import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "localizacao_estoque"})
export class StockLocation {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "integer"})
    endereco_id!: number

    @Column({ type: "character varying", length: 50, nullable: true})
    responsavel?: string

    @Column({ type: "character varying", length: 20, nullable: true})
    telefone?: string

    @Column({ type: "character varying", length: 100, nullable: true})
    email?: string
};