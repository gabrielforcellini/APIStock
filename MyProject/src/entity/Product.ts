import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "produto"})
export class Product {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 50})
    nome!: string

    @Column({type: "text"})
    descricao?: string

    @Column({ type: "character varying", length:50})
    categoria?: string

    @Column({ type: "numeric", length:10, scale: 2})
    preco_compra?: number

    @Column({ type: "numeric", length:10, scale: 2})
    preco_venda?: number

    @Column({ type: "integer"})
    quantidade_estoque?: number

    @Column({ type: "character varying", length: 20})
    unidade_medida?: string

    @Column({ type: "integer"})
    fornecedor_id?: number

    @Column({ type: "character varying", length: 50})
    codigo_barras?: string

    @Column({ type: "timestamp without time zone"})
    data_criacao?: Date

    @Column({ type: "timestamp without time zone"})
    data_atualizacao?: Date

    @Column({ type: "character varying", length: 50})
    marca?: string

    @Column({ type: "boolean"})
    item_consumo?: boolean

    @Column({ type: "boolean"})
    item_venda?: boolean

    @Column({ type: "character varying", length: 20})
    status?: string
}