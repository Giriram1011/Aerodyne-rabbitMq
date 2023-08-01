import { Controller, Get, Post, Body, Patch, Param, Delete,HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, } from '@nestjs/swagger';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
     return await this.userService.create(createUserDto);
  }
  
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('role')
  async roleGet() {
    return this.userService.roleGet();
  }
  
}
