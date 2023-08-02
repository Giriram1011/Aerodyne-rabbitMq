import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { RoleSchema,Role } from './entities/role.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared.module';
@Module({
  imports:[
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]), 
    SharedModule],
  controllers: [RoleController],
  providers: [RoleService,{ provide: AmqpConnection, useFactory: () => AmqpConnection }]
})
export class RoleModule {}
