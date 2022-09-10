import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultUser } from 'src/entities/default/user.entity';
import { DefaultUserService } from 'src/service/default/user/user.service';
import { DefaultUserController } from './user/user.controller';
import { OrderController } from './order/order.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([DefaultUser]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [DefaultUserController, OrderController],
  providers: [DefaultUserService],
  exports: [DefaultUserService],
})
export class DefaultModule {}
