import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User,UserSchema } from './schemas/user.schemas';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
const uri =`amqp://admin:admin@172.20.6.22:5672/rabbit`;
@Module({
  imports:[
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
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
    }),
    ],
  controllers: [UserController],
  providers: [UserService
        // { provide: AmqpConnection, useFactory: () => AmqpConnection }
  ]
})
export class UserModule {}
