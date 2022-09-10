import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BannerService } from 'src/service/admin/banner/banner.service';
import { ToolsService } from 'src/service/tools/tools.service';

@Controller('admin/banner')
@UseGuards(JwtAuthGuard)
export class BannerController {
  constructor(
    private readonly bannerService: BannerService,
    private readonly toolsService: ToolsService,
  ) {}

  // 获取banner列表
  @Get()
  async getBannerList() {
    return this.bannerService.getBannerList();
  }

  // 新增banner
  @Post('insert')
  @UseInterceptors(FileInterceptor('img'))
  async addBanner(@Body() banner, @UploadedFile() file) {
    const { saveDir } = await this.toolsService.uploadFile(file);
    await this.bannerService.createBanner(
      Object.assign(banner, {
        img: saveDir,
      }),
    );
  }

  // 更新banner
  @Put('update')
  @UseInterceptors(FileInterceptor('img'))
  async updateBanner(@Body() banner, @UploadedFile() file) {
    const { saveDir } = await this.toolsService.uploadFile(file);
    await this.bannerService.updateBanner(
      Object.assign(banner, {
        img: saveDir,
      }),
    );
  }

  // 删除banner
  @Post(':id')
  async deleteBanner(@Param('id') id: string) {
    await this.bannerService.deleteBanner(id);
  }
}
