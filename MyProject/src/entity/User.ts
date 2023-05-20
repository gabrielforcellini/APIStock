import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    sobrenome: string

    @Column()
    email: string

    @Column()
    senha: string

    @Column()
    telefone: string

    @Column()
    endereco: string

    @Column()
    cidade: string

    @Column()
    estado: string
    

}
