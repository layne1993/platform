import { Module } from '@nestjs/common';
import { PublicModule } from '../public/public.module';

import { AdminUserController } from './user/user.controller';
import { AdminRoleController } from './role/role.controller';
import { BannerController } from './banner/banner.controller';
import { CategoController } from './catego/catego.controller';

@Module({
  imports: [PublicModule],
  controllers: [
    AdminUserController,
    AdminRoleController,
    BannerController,
    CategoController,
  ],
})
export class AdminModule {}
