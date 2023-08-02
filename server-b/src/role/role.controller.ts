import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AmqpConnection, RabbitSubscribe ,RabbitRPC} from '@golevelup/nestjs-rabbitmq';
import { ApiTags,ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('role')

@Controller('role')
export class RoleController {
  constructor(private readonly amqpConnection: AmqpConnection,private readonly roleService:RoleService) {}
  // @RabbitSubscribe({
  //   exchange: 'user',
  //   routingKey: 'getRoleInfo',
  // })
  // async handleUserInfoMessage(message: any) {
  //       console.log('Received message:', message);
  // }

  @Post()
  async create(@Body() createUserDto: CreateRoleDto) {
     return await this.roleService.create(createUserDto);
  }
  @RabbitRPC({
    exchange: 'user',
    routingKey: 'getRoleDetails',
    queue: 'subscribe-queue',
   
  })
  public async rpcHandler(msg: {}) {
    console.log(`Received rpc message in role module: ${JSON.stringify(msg)}`);
    return this.roleService.findAll();
  }
  
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

}
