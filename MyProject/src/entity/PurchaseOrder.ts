import { object } from "joi";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "pedido_compra"})
export class PurchaseOrder {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "integer"})
    fornecedor_id!: number

    @Column({ type: "date"})
    data_pedido?: Date

    @Column({ type: "date"})
    data_entrega?: Date

    @Column({ type: "character varying", length: 20})
    status?: string

    @Column({ type: "text"})
    observacoes?: string
}