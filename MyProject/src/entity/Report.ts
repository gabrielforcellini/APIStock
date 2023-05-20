import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "relatorio"})
export class Report {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number

    @Column({ type: "character varying", length: 50})
    tipo!: string

    @Column({ type: "date"})
    data_inicio!: Date

    @Column({ type: "date"})
    data_fim!: Date

    @Column({ type: "text"})
    descricao?: string

    @Column({ type: "bytea"})
    arquivo?: null

    @Column({ type: "timestamp without time zone"})
    data_atualizacao?: Date
}