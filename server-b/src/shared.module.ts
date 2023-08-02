// shared.module.ts
import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

const Rmq:any =  RabbitMQModule.forRootAsync(RabbitMQModule, {
  useFactory: () => ({
    exchanges: [
      {
        name: 'user',
        type: 'topic',
      },
    ],
    uri: 'amqp://admin:admin@172.20.6.22:5672',
    enableControllerDiscovery: true,
    connectionInitOptions: { wait: true, reject: true, timeout: 3000 },
  }),
})
@Module({
  imports: [
    Rmq
  ],
  exports : [
    Rmq
  ]
})
export class SharedModule {}
