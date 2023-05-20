import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("usuario")
export class User {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    nome!: string

    @Column()
    sobrenome!: string

    @Column()
    email!: string

    @Column()
    senha!: string

    @Column()
    telefone!: string

    @Column({ nullable: true })
    data_criacao?: Date

    @Column({ nullable: true })
    data_atualizacao?: Date

};