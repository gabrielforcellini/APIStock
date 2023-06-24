import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import * as dotenv from 'dotenv';
import { Address } from './entity/Address/Address';
import { District } from './entity/Address/District';
import { City } from './entity/Address/City';
import { State } from './entity/Address/State';
import { Country } from './entity/Address/Country';
import { Supplier } from './entity/Supplier';
import { Stock } from './entity/Stock';
import { Product } from './entity/Product';
import { Establishment } from './entity/Establishment';
import { Category } from './entity/Category';
import { Stock_Product } from "./entity/Stock_Product";
import { Preferences } from './entity/Preferences';

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
    entities: [User, Address, District, City, State, Country, Supplier, Stock, Product, Establishment, Category, Stock_Product, Preferences],
    migrations: [],
    subscribers: [],
});