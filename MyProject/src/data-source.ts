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
    port
} = process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
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
