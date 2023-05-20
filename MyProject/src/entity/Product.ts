import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "produto"})
export class Product {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 50})
    nome!: string

    @Column({type: "text", nullable: true})
    descricao?: string

    @Column({ type: "character varying", length:50, nullable: true})
    categoria?: string

    @Column({ type: "numeric", length:10, scale: 2, nullable: true})
    preco_compra?: number

    @Column({ type: "numeric", length:10, scale: 2, nullable: true})
    preco_venda?: number

    @Column({ type: "integer", nullable: true})
    quantidade_estoque?: number

    @Column({ type: "character varying", length: 20, nullable: true})
    unidade_medida?: string

    @Column({ type: "integer", nullable: true})
    fornecedor_id?: number

    @Column({ type: "character varying", length: 50, nullable: true})
    codigo_barras?: string

    @Column({ type: "timestamp without time zone", nullable: true})
    data_criacao?: Date

    @Column({ type: "timestamp without time zone", nullable: true})
    data_atualizacao?: Date

    @Column({ type: "character varying", length: 50, nullable: true})
    marca?: string

    @Column({ type: "boolean", nullable: true})
    item_consumo?: boolean

    @Column({ type: "boolean", nullable: true})
    item_venda?: boolean

    @Column({ type: "character varying", length: 20, nullable: true})
    status?: string
};