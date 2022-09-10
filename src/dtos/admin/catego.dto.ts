import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
