import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { RegisterUserDto } from 'src/dtos/default/user.dto';
import { DefaultUser } from 'src/entities/default/user.entity';

@Injectable()
export class DefaultUserService {
  constructor(
    @InjectRepository(DefaultUser)
    private readonly userRepository: Repository<DefaultUser>,
  ) {}

  // 注册用户
  async register(registerUser: RegisterUserDto) {
    const existUser = await this.userRepository.findOneBy({
      username: registerUser.username,
    });
    if (existUser) {
      throw new BusinessException('用户名已存在');
    }
    const existMobile = await this.userRepository.findOneBy({
      mobile: registerUser.mobile,
    });
    if (existMobile) {
      throw new BusinessException('手机号已存在');
    }
    const newUser: DefaultUser = this.userRepository.create({
      ...registerUser,
    });
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
      .createQueryBuilder('defaultUser')
      .addSelect('defaultUser.password')
      .where('defaultUser.username=:username', { username })
      .getOne();
  }
}
