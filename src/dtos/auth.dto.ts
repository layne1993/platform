import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum LOGIN_TYPE {
  admin = 'admin',
  default = 'default',
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(LOGIN_TYPE)
  source: LOGIN_TYPE;
}

export class UserInfoDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  mobile: string;

  @IsNotEmpty()
  @IsString()
  source: string;
}
