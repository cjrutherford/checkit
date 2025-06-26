import {
    ChecklistRun,
    ChecklistTemplate,
    RunTask,
    SaltEntity,
    TemplateTask,
    TokenEntity,
    UserEntity,
    UserProfileEntity,
} from "./database/entities";
import { DataSource, DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: process.env.DB_NAME ?? 'checkit',
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


const ds = new DataSource(config);


export default ds;