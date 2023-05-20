import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import * as dotenv from 'dotenv';

dotenv.config();

const {
    username,
    password,
    database,
    host,
    port,
} = process.env;

const type = process.env.database as 'mysql' | 'mariadb' | 'postgres';

export const AppDataSource = new DataSource({
    type: type,
    host: host,
    port: parseInt(port),
    username: username,
    password: password,
    database: database,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
