/**
 * Main application module for the Checkit backend API.
 * Imports all feature modules and configures dependency injection.
 */
import { AssetModule } from './asset/asset.module';
import { AuthenticationModule } from './authentication/authentication.module';
import ChecklistModule from './checklist/checklist.module';
import { InternalConfigModule } from './internal-config/internal-config.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

/**
 * Root module that bundles all feature modules.
 */
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
