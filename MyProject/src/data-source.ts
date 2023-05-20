import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import * as dotenv from 'dotenv';

dotenv.config();

const {
    db_user,
    db_password,
    database,
    db_host,
    db_port,
} = process.env;

const db_type = process.env.db_type as 'mysql' | 'mariadb' | 'postgres';

export const AppDataSource = new DataSource({
    type: db_type,
    host: db_host,
    port: parseInt(db_port),
    username: db_user,
    password: db_password,
    database: database,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});