import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoDto } from 'src/dtos/admin/catego.dto';
import { Catego } from 'src/entities/default/catego.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoService {
  constructor(
    @InjectRepository(Catego)
    private readonly categoRepository: Repository<Catego>,
  ) {}

  // 获取所有分类
  async getAllCatego() {
    const [data, count] = await this.categoRepository.findAndCount();
    return {
      list: data,
      count,
    };
  }

  // 新增分类
  async addCatego(catego: CreateCategoDto) {
    const newCatego: Catego = this.categoRepository.create(catego);
    await this.categoRepository.save(newCatego);
    return true;
  }
}
