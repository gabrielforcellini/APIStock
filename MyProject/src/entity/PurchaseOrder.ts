import { object } from "joi";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "pedido_compra"})
export class PurchaseOrder {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "integer"})
    fornecedor_id!: number

    @Column({ type: "date", nullable: true})
    data_pedido?: Date

    @Column({ type: "date", nullable: true})
    data_entrega?: Date

    @Column({ type: "character varying", length: 20, nullable: true})
    status?: string

    @Column({ type: "text", nullable: true})
    observacoes?: string
};