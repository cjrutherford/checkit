import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { ChecklistRun, ChecklistTemplate, RunTask, SaltEntity, TemplateTask, TokenEntity, UserEntity, UserProfileDto, UserProfileEntity } from 'src/database/entities';
import { DataSource } from 'typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [() => {
                return {
                    DB_HOST: process.env.DB_HOST || 'localhost',
                    DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
                    DB_USERNAME: process.env.DB_USERNAME || 'postgres',
                    DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
                    DB_NAME: process.env.DB_NAME || 'checkit',
                    APPLICATION_ENCRIPTION_SEED: process.env.APPLICATION_ENCRIPTION_SEED || 'default_seed',
                    ASSET_PATH: process.env.ASSET_PATH || '/assets',
                }
            }]
        }),
        DatabaseModule.register({
            name: 'checkit', 
            factory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get<string>('DB_HOST'),
                port: config.get<number>('DB_PORT'),
                username: config.get<string>('DB_USERNAME'),
                password: config.get<string>('DB_PASSWORD'),
                database: config.get<string>('DB_NAME'),
                entities: [
                    ChecklistRun,
                    UserEntity,
                    SaltEntity,
                    TokenEntity,
                    ChecklistTemplate,
                    RunTask,
                    TemplateTask,
                    UserProfileEntity
                ],
                synchronize: true,
                logging: false
            })
        })
    ],
    exports: [
        ConfigModule,
        getRepositoryToken(ChecklistTemplate),
        getRepositoryToken(TemplateTask),
        getRepositoryToken(RunTask),
        getRepositoryToken(ChecklistRun),
        getRepositoryToken(UserEntity),
        getRepositoryToken(TokenEntity),
        getRepositoryToken(SaltEntity),
        getRepositoryToken(UserProfileEntity)
    ],
    providers: [
        {
            provide: getRepositoryToken(ChecklistTemplate),
            useFactory: (dataSource: DataSource) => dataSource.getRepository(ChecklistTemplate),
            inject: ["CHECKIT_CONNECTION"]
        },{
            provide: getRepositoryToken(TemplateTask),
            useFactory: (dataSource: DataSource) => dataSource.getRepository(TemplateTask),
            inject: ["CHECKIT_CONNECTION"]
        }, {
            provide: getRepositoryToken(RunTask),
            useFactory: (dataSource: DataSource) => dataSource.getRepository(RunTask),
            inject: ["CHECKIT_CONNECTION"]
        }, {
            provide: getRepositoryToken(ChecklistRun),
            useFactory: (dataSource: DataSource) => dataSource.getRepository(ChecklistRun),
            inject: ["CHECKIT_CONNECTION"]
        },{
            provide: getRepositoryToken(UserEntity),
            useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
            inject: ['CHECKIT_CONNECTION'],
        },{
            provide: getRepositoryToken(TokenEntity),
            useFactory: (dataSource: DataSource) => dataSource.getRepository(TokenEntity),
            inject: ['CHECKIT_CONNECTION'],
        },{
            provide: getRepositoryToken(SaltEntity),
            useFactory: (dataSource: DataSource) => dataSource.getRepository(SaltEntity),
            inject: ['CHECKIT_CONNECTION'],
        },{
            provide: getRepositoryToken(UserProfileEntity),
            useFactory: (dataSource: DataSource) => dataSource.getRepository(UserProfileEntity),
            inject: ['CHECKIT_CONNECTION'],
        }
    ]
})
export class InternalConfigModule { }
