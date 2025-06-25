import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetModule } from './asset/asset.module';
import { AuthenticationModule } from './authentication/authentication.module';
import ChecklistModule from './checklist/checklist.module';
import { InternalConfigModule } from './internal-config/internal-config.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthenticationModule, 
    UsersModule, 
    AssetModule,
    ChecklistModule,
    InternalConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
