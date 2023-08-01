// create-admin.dto.ts
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  role_id: string;

  @ApiProperty()
  @IsNotEmpty()
  bio: string;

  @ApiProperty()
  address: string;
  roleName:string
}
