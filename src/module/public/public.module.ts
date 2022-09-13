import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Banner } from 'src/entities/admin/banner.entity';
import { AdminRole } from 'src/entities/admin/role.entity';
import { AdminUser } from 'src/entities/admin/user.entity';
import { Catego } from 'src/entities/default/catego.entity';
import { Goods } from 'src/entities/default/goods.entity';

import { ToolsService } from 'src/service/tools/tools.service';
import { AdminRoleService } from 'src/service/admin/role/role.service';
import { AdminUserService } from 'src/service/admin/user/user.service';
import { BannerService } from 'src/service/admin/banner/banner.service';
import { CategoService } from 'src/service/admin/catego/catego.service';
import { DefaultUserService } from 'src/service/default/user/user.service';
import { DefaultUser } from 'src/entities/default/user.entity';
import { GoodService } from 'src/service/default/goods/goods.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdminRole,
      AdminUser,
      Banner,
      Catego,
      Goods,
      DefaultUser,
    ]),
  ],
  providers: [
    ToolsService,
    AdminRoleService,
    AdminUserService,
    BannerService,
    CategoService,
    DefaultUserService,
    GoodService,
  ],
  exports: [
    ToolsService,
    AdminRoleService,
    AdminUserService,
    BannerService,
    CategoService,
    DefaultUserService,
    GoodService,
  ],
})
export class PublicModule {}
