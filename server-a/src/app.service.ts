import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class AppService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async request():Promise<any>{
    let exchange = 'user';
    let routingKey = 'initial';
    let payload = { key: 'testing' };
    let timeout =10000
    const response = await this.amqpConnection.request<any>({
      exchange,
      routingKey,
      payload,
      timeout,
    });

    return response as any;
  }
}
