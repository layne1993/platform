import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserDto } from 'src/dtos/default/user.dto';
import { DefaultUserService } from 'src/service/default/user/user.service';

@Controller('default/user')
export class DefaultUserController {
  constructor(private readonly userService: DefaultUserService) {}

  // 用户注册
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }
}
