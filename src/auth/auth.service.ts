import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { LoginUserDto, UserInfoDto } from 'src/dtos/auth.dto';
import { AdminUserService } from 'src/service/admin/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminUserService: AdminUserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginUserDto: LoginUserDto) {
    let existUser;
    if (loginUserDto.source === 'admin') {
      existUser = await this.adminUserService.getUserByName(
        loginUserDto.username,
      );
    }

    if (!existUser) {
      throw new BadRequestException('用户名不正确！');
    }

    if (!compareSync(loginUserDto.password, existUser.password)) {
      throw new BadRequestException('密码错误！');
    }

    const userInfo: UserInfoDto = {
      id: existUser.id,
      username: existUser.username,
      mobile: existUser.mobile,
      source: loginUserDto.source,
    };
    return userInfo;
  }

  async getUser(payload: UserInfoDto) {
    let existUser;
    if (payload.source === 'admin') {
      existUser = await this.adminUserService.getUserById(payload.id);
    }

    if (!existUser) {
      throw new BadRequestException('token校验失败！');
    }

    const userInfo: UserInfoDto = {
      id: existUser.id,
      username: existUser.username,
      mobile: existUser.mobile,
      source: payload.source,
    };
    return userInfo;
  }

  async login(userInfo: UserInfoDto) {
    const token = await this.createToken(userInfo);
    return token;
  }

  async createToken(payload) {
    return await this.jwtService.sign(payload);
  }
}
