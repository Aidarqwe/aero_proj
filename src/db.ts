import { Sequelize } from 'sequelize-typescript';
import * as dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize({
    dialect: 'mysql',
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    port: parseInt(process.env.DB_PORT || "3306", 10),
    database: process.env.DB_NAME,
    logging: false,
});

export default sequelize;
