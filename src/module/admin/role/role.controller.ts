import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/auth/constant';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  CreateRoleDto,
  RolePaginationDto,
  UpdateRoleDto,
} from 'src/dtos/admin/role.dto';
import { AdminRoleService } from 'src/service/admin/role/role.service';

@Controller('admin/role')
@UseGuards(JwtAuthGuard)
export class AdminRoleController {
  constructor(private readonly roleService: AdminRoleService) {}

  // 新建角色
  @Post('create')
  @Public()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  // 根据id获取单个角色
  @Get(':id')
  async getRoleById(@Param('id') id: string) {
    return this.roleService.getRoleById(id);
  }

  // 修改角色
  @Put('update')
  async updateRole(@Body() updateRole: UpdateRoleDto) {
    return this.roleService.updateRole(updateRole);
  }

  // 删除角色
  @Delete(':id')
  async deleteRole(@Param('id') id: string) {
    return this.roleService.deleteRoleById(id);
  }

  // 获取所有角色
  @Get('allRole')
  async getAllRole() {
    return this.roleService.getAllRole();
  }

  // 分页获取所有角色
  @Get('pagination')
  async getRoleByPagination(@Query() query: RolePaginationDto) {
    return this.roleService.getRoleByPagination(query);
  }
}
