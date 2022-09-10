import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isNotEmpty } from 'class-validator';
import { paginate } from 'nestjs-typeorm-paginate';
import {
  CreateRoleDto,
  RolePaginationDto,
  UpdateRoleDto,
} from 'src/dtos/admin/role.dto';
import { AdminRole } from 'src/entities/admin/role.entity';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { getPaginationOptions } from 'src/extend/helper';

@Injectable()
export class AdminRoleService {
  constructor(
    @InjectRepository(AdminRole)
    private readonly roleRepository: Repository<AdminRole>,
  ) {}

  // 获取所有角色
  getAllRole() {
    return this.roleRepository.find();
  }

  // 分页获取所有角色
  getRoleByPagination(roleQuery: RolePaginationDto) {
    const { name, currentPage, pageSize } = roleQuery;
    const rolePagination = {
      currentPage: +currentPage,
      pageSize: +pageSize,
    };
    const queryBuilder = this.roleRepository.createQueryBuilder('adminRole');
    queryBuilder.orderBy('adminRole.updateDate', 'DESC');
    if (isNotEmpty(name)) {
      queryBuilder.where('adminRole.name LIKE :name', {
        name: `%${name}%`,
      });
    }
    return paginate<AdminRole, CustomPaginationMeta>(
      queryBuilder,
      getPaginationOptions(rolePagination),
    );
  }

  // 新增角色
  async createRole(roleDto: CreateRoleDto) {
    const existRole = await this.roleRepository.findOneBy({
      name: roleDto.name,
    });
    if (existRole) {
      throw new BusinessException('该角色已存在');
    }
    const newRole: AdminRole = this.roleRepository.create({ ...roleDto });
    await this.roleRepository.save(newRole);
    return true;
  }

  // 根据id获取角色详情
  getRoleById(id: string) {
    return this.roleRepository.findOneBy({ id });
  }

  // 更新角色
  async updateRole(roleDto: UpdateRoleDto) {
    const { id } = roleDto;
    const existRole = await this.roleRepository.findOneBy({ id });
    if (!existRole) {
      throw new BusinessException('该角色不存在');
    }
    const newRole: AdminRole = this.roleRepository.merge(existRole, roleDto);
    await this.roleRepository.save(newRole);
    return true;
  }

  // 删除角色
  async deleteRoleById(id: string) {
    const existRole = await this.roleRepository.findOneBy({ id });
    if (!existRole) {
      throw new BusinessException('该角色不存在');
    }
    await this.roleRepository.delete(id);
    return true;
  }
}
