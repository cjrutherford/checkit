import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AssetModule } from 'src/asset/asset.module';
import { InternalConfigModule } from 'src/internal-config/internal-config.module';

@Module({
  imports: [
    AssetModule,
    InternalConfigModule,
  ],
  providers: [
        UsersService,
    ],
  controllers: [UsersController],
})
export class UsersModule {}
