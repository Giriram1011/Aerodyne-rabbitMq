import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { RoleSchema,Role } from './entities/role.schemas';
import { MongooseModule } from '@nestjs/mongoose';
const uri =`amqp://admin:admin@172.20.6.22:5672/rabbit`;
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]), 
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: () => ({
        exchanges: [
          {
            name: 'user',
            type: 'topic',
          },
        ], 
        uri,
        enableControllerDiscovery: true,
        connectionInitOptions: { wait: true, reject: true, timeout: 3000 },
      }),
    }),],
  controllers: [RoleController],
  providers: [RoleService,{ provide: AmqpConnection, useFactory: () => AmqpConnection }]
})
export class RoleModule {}
