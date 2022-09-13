import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { Goods } from 'src/entities/default/goods.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GoodService {
  constructor(
    @InjectRepository(Goods)
    private readonly goodRepository: Repository<Goods>,
  ) {}

  // 删除商品
  async deleteGoods(id: string) {
    const existGoods = await this.goodRepository.findOneBy({ id });
    if (!existGoods) {
      throw new BusinessException('该产品不存在');
    }
    await this.goodRepository.delete(id);
    return true;
  }
}
