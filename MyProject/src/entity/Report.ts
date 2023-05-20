import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    tipo!: string

    @Column()
    data_inicio!: Date

    @Column()
    data_fim!: Date

    @Column()
    descricao?: string

    @Column()
    arquivo?: null

    @Column()
    data_atualizacao?: Date
}