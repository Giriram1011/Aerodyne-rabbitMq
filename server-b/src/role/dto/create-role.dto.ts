import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {

    @ApiProperty()
    @IsNotEmpty()
    role_name: string;
    
    @ApiProperty()
    @IsNotEmpty()
    status: string;
  
   }
