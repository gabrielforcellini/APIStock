import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "movimentacao_estoque"})
export class StockMovement {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "integer"})
    produto_id!: number

    @Column({ type: "integer", nullable: true})
    quantidade?: number

    @Column({ type: "character varying", length: 50, nullable: true})
    tipo_movimentacao?: string

    @Column({ type: "timestamp without time zone", nullable: true})
    data_movimentacao?: Date

    @Column({ type: "text", nullable: true})
    observacoes?: string
};