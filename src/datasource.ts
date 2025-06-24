import { DataSource, DataSourceOptions } from "typeorm";
import { 
    ChecklistTemplate,
    ChecklistRun,
    RunTask,
    TemplateTask,
    UserEntity,
    UserProfileEntity,
    TokenEntity,
    SaltEntity,
 } from "./database/entities";

 const config: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'checkit',
    entities: [
        ChecklistTemplate,
        ChecklistRun,
        RunTask,
        TemplateTask,
        UserEntity,
        UserProfileEntity,
        TokenEntity,
        SaltEntity
    ],
    migrations: ['src/database/migrations/*.ts'],
 }

 console.log('Database configuration:', {
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
 });
 

const ds = new DataSource(config);


export default ds;