import { Entity, PrimaryGeneratedColumn, Column, Tree } from "typeorm";

@Entity({ name: "nota_fiscal"})
export class FiscalNote {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "integer"})
    fornecedor_id!: number

    @Column({ type: "date", nullable: true})
    data_emissao?: Date

    @Column({ type: "character varying", length: 20})
    numero!: number

    @Column({ type: "numeric"})
    valor_total!: number

    @Column({ type: "text", nullable: true})
    observacoes?: string
};