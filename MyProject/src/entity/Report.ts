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

    @Column({ type: "text", nullable: true})
    descricao?: string

    @Column({ type: "bytea", nullable: true})
    arquivo?: null

    @Column({ type: "timestamp without time zone", nullable: true})
    data_atualizacao?: Date
};