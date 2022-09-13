import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GoodService } from 'src/service/default/goods/goods.service';
import { ToolsService } from 'src/service/tools/tools.service';

@Controller('default/goods')
@UseGuards(JwtAuthGuard)
export class GoodsController {
  constructor(
    private readonly goodService: GoodService,
    private readonly toolsService: ToolsService,
  ) {}

  // 新增商品
  @Post('create')
  @UseInterceptors(FilesInterceptor('imgs'))
  async addGoods(@Body() goodsDto: any, @UploadedFiles() files, @Req() req) {
    const filesaaa = await this.toolsService.uploadFiles(files);
    console.log(filesaaa);
  }

  // 删除商品
  @Post(':id')
  async deleteGoods(@Param('id') id: string) {
    await this.goodService.deleteGoods(id);
  }
}
