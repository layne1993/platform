import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { CreateBannerDto, UpdateBannerDto } from 'src/dtos/admin/banner.dto';
import { Banner } from 'src/entities/admin/banner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
  ) {}

  // 获取banner列表
  async getBannerList() {
    return this.bannerRepository.find();
  }

  // 新增banner
  async createBanner(bannerDto: CreateBannerDto) {
    const counts = await this.bannerRepository.count();
    const newBanner: Banner = this.bannerRepository.create({
      ...bannerDto,
      sort: counts + 1,
    });
    await this.bannerRepository.save(newBanner);
    return true;
  }

  // 编辑banner
  async updateBanner(bannerDto: UpdateBannerDto) {
    const { id } = bannerDto;
    const existBanner = await this.bannerRepository.findOneBy({ id });
    if (!existBanner) {
      throw new BusinessException('id不存在');
    }
    const newUser: Banner = this.bannerRepository.merge(existBanner, bannerDto);
    await this.bannerRepository.save(newUser);
    return true;
  }

  // 删除
  async deleteBanner(id: string) {
    const existBanner = await this.bannerRepository.findOneBy({ id });
    if (!existBanner) {
      throw new BusinessException('id不存在');
    }
    await this.bannerRepository.delete(id);
    return true;
  }
}
