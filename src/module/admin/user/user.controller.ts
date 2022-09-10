import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  CreateUserDto,
  UpdatePwdDto,
  UpdateUserDto,
  UserPaginationDto,
} from 'src/dtos/admin/user.dto';
import { AdminUserService } from 'src/service/admin/user/user.service';

@Controller('admin/user')
@UseGuards(JwtAuthGuard)
export class AdminUserController {
  constructor(private readonly userService: AdminUserService) {}

  // 新建用户
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // 获取用户详情
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  // 更新用户信息
  @Put('update')
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto);
  }

  // 修改密码
  @Put('hangePwd')
  async changeUserPwd(@Body() updateUserDto: UpdatePwdDto) {
    return this.userService.updateUserPwd(updateUserDto);
  }

  // 启用/禁用
  @Patch(':id/status')
  async changeUserStatus(@Param('id') id: string) {
    return this.userService.changeStatus(id);
  }

  // 删除用户
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  // 获取所有用户
  @Get('allUser')
  async getAllUser() {
    return this.userService.getAllUser();
  }

  // 分页获取用户列表
  @Get('pagination')
  async getUserByPagination(@Query() query: UserPaginationDto) {
    return this.userService.getUserByPagination(query);
  }
}
