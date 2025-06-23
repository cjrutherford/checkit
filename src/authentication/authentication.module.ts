import { Module } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { UserEntity, SaltEntity, TokenEntity } from '../database/entities';
import { DataSource } from 'typeorm';
import { AuthService } from './auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationController } from './authentication.controller';
import { InternalConfigModule } from 'src/internal-config/internal-config.module';

@Module({
    imports: [
        InternalConfigModule,
    ],
    controllers: [AuthenticationController],
    providers: [ 
        AuthService,  
    ],
})
export class AuthenticationModule {}
