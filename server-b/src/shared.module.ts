import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange1',
          type: 'topic',
        },
      ],
      uri: 'amqp://admin:admin@172.20.6.22:5672',
      enableControllerDiscovery: true,
      connectionInitOptions: { wait: false },
    }),
  ],
})
export class SharedModule {}
