import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isNotEmpty } from 'class-validator';
import { paginate } from 'nestjs-typeorm-paginate';
import { AdminUser } from 'src/entities/admin/user.entity';
import {
  CreateUserDto,
  UpdatePwdDto,
  UpdateUserDto,
  UserPaginationDto,
} from 'src/dtos/admin/user.dto';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { AdminRoleService } from '../role/role.service';
import { getPaginationOptions } from 'src/extend/helper';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly userRepository: Repository<AdminUser>,
    private readonly roleService: AdminRoleService,
  ) {}

  // 新增用户
  async createUser(userDto: CreateUserDto) {
    const existUser = await this.userRepository.findOneBy({
      username: userDto.username,
    });
    if (existUser) {
      throw new BusinessException('用户名已存在');
    }
    const existMobile = await this.userRepository.findOneBy({
      mobile: userDto.mobile,
    });
    if (existMobile) {
      throw new BusinessException('手机号已存在');
    }
    const role = await this.roleService.getRoleById(userDto.roleId);
    const newUser: AdminUser = this.userRepository.create({ ...userDto, role });
    await this.userRepository.save(newUser);
    return true;
  }

  // 根据id获取用户详情
  async getUserById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  // 根据用户名获取用户详情
  async getUserByName(username: string) {
    return this.userRepository
      .createQueryBuilder('adminUser')
      .addSelect('adminUser.password')
      .where('adminUser.username=:username', { username })
      .getOne();
  }

  // 修改用户
  async updateUser(userDto: UpdateUserDto) {
    const { id } = userDto;
    const existUser = await this.userRepository.findOneBy({ id });
    if (!existUser) {
      throw new BusinessException('该用户不存在');
    }
    if (userDto.username) {
      const existName = await this.userRepository.findOneBy({
        username: userDto.username,
      });
      if (existName) {
        throw new BusinessException('用户名已存在');
      }
    }
    if (userDto.mobile) {
      const existMobile = await this.userRepository.findOneBy({
        mobile: userDto.mobile,
      });
      if (existMobile) {
        throw new BusinessException('手机号已存在');
      }
    }
    let role = {};
    if (userDto.roleId) {
      role = await this.roleService.getRoleById(userDto.roleId);
    } else {
      role = existUser.role;
    }
    const newUser: AdminUser = this.userRepository.merge(existUser, {
      ...userDto,
      role,
    });
    await this.userRepository.save(newUser);
    return true;
  }

  // 修改用户密码
  async updateUserPwd(userDto: UpdatePwdDto) {
    const { id } = userDto;
    const existUser = await this.userRepository.findOneBy({ id });
    if (!existUser) {
      throw new BusinessException('该用户不存在');
    }
    const newUser: AdminUser = this.userRepository.merge(existUser, userDto);
    await this.userRepository.save(newUser);
    return true;
  }

  // 启用/禁用用户
  async changeStatus(id: string) {
    const existUser = await this.userRepository.findOneBy({ id });
    if (!existUser) {
      throw new BusinessException('该用户不存在');
    }
    const newUser: AdminUser = this.userRepository.merge(existUser, {
      status: existUser.status === 'enabled' ? 'disabled' : 'enabled',
    });
    await this.userRepository.save(newUser);
    return true;
  }

  // 删除用户
  async deleteUser(id: string) {
    const existUser = await this.userRepository.findOneBy({ id });
    if (!existUser) {
      throw new BusinessException('该用户不存在');
    }
    await this.userRepository.delete(id);
    return true;
  }

  // 获取所有用户
  getAllUser() {
    return this.userRepository.find();
  }

  // 分页获取所有用户
  getUserByPagination(roleQuery: UserPaginationDto) {
    const { username, mobile, status, roleId, currentPage, pageSize } =
      roleQuery;
    const userPagination = {
      currentPage: +currentPage,
      pageSize: +pageSize,
    };
    const queryBuilder = this.userRepository
      .createQueryBuilder('adminUser')
      .leftJoinAndSelect('adminUser.role', 'role');
    queryBuilder.orderBy('adminUser.updateDate', 'DESC');
    if (isNotEmpty(username)) {
      queryBuilder.where('adminUser.username LIKE :username', {
        username: `%${username}%`,
      });
    }
    if (isNotEmpty(mobile)) {
      queryBuilder.orWhere('adminUser.mobile LIKE :mobile', {
        mobile: `%${mobile}%`,
      });
    }
    if (isNotEmpty(status)) {
      queryBuilder.where('status=:status', {
        status,
      });
    }
    if (isNotEmpty(roleId)) {
      queryBuilder.where('roleId=:roleId', {
        roleId,
      });
    }
    return paginate<AdminUser, CustomPaginationMeta>(
      queryBuilder,
      getPaginationOptions(userPagination),
    );
  }
}
