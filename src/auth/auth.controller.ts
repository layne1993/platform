import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto, UserInfoDto } from 'src/dtos/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

declare module 'express' {
  interface Request {
    user: UserInfoDto;
  }
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录接口
  @Post('admin/login')
  async login(@Body() loginUser: LoginUserDto) {
    try {
      const user = await this.authService.validateUser(loginUser);
      return this.authService.login(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // 验证
  @UseGuards(JwtAuthGuard)
  @Get('admin/profile')
  me(@Req() req: Request) {
    // 使用Passport后，会将解析后的token信息挂载到req.user上
    return req.user;
  }

  // 商城登录
  @Post('default/login')
  async defaultLogin(@Body() loginUser: LoginUserDto) {
    try {
      const user = await this.authService.validateUser(loginUser);
      return this.authService.login(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // 商城验证
  @UseGuards(JwtAuthGuard)
  @Get('default/profile')
  defaultMe(@Req() req: Request) {
    // 使用Passport后，会将解析后的token信息挂载到req.user上
    return req.user;
  }
}
