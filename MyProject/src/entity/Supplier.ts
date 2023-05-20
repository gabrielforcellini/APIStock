import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "fornecedor"})
export class Supplier {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 100})
    nome!: string

    @Column({ type: "integer"})
    endereco_id!: number

    @Column({ type: "text"})
    observacoes?: string
};