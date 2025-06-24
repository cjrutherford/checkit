import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AssetModule } from './asset/asset.module';
import { InternalConfigModule } from './internal-config/internal-config.module';
import ChecklistModule from './checklist/checklist.module';

@Module({
  imports: [
    AuthenticationModule, 
    UsersModule, 
    AssetModule,
    ChecklistModule,
    InternalConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
