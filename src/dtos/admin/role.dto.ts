import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNumber()
  weight?: number;
}

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class RolePaginationDto {
  @IsNotEmpty()
  @IsString()
  currentPage: string;

  @IsNotEmpty()
  @IsString()
  pageSize: string;

  @IsString()
  @IsOptional()
  name?: string;
}
