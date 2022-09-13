import { Module } from '@nestjs/common';
import { PublicModule } from '../public/public.module';

import { DefaultUserController } from './user/user.controller';
import { OrderController } from './order/order.controller';
import { GoodsController } from './goods/goods.controller';

@Module({
  imports: [PublicModule],
  controllers: [DefaultUserController, OrderController, GoodsController],
})
export class DefaultModule {}
