import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Public } from 'src/auth/constant';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCategoDto } from 'src/dtos/admin/catego.dto';
import { CategoService } from 'src/service/admin/catego/catego.service';

@Controller('admin/catego')
@UseGuards(JwtAuthGuard)
export class CategoController {
  constructor(private readonly categoService: CategoService) {}
  // 获取所有分类
  @Get()
  @Public()
  async getCategos() {
    return this.categoService.getAllCatego();
  }

  // 新增分类
  @Post('insert')
  async addCatego(@Body() categoDto: CreateCategoDto) {
    return this.categoService.addCatego(categoDto);
  }
}
