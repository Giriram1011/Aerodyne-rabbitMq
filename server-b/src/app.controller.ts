
import { Controller, Get } from '@nestjs/common';

import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
@Injectable()
@Controller()

export class AppController {
 
  public async pubSubHandler(msg: {}) {
    console.log(`Received pub/sub message: ${JSON.stringify(msg)}`);
    return { message: 'frompubsub' };
  } 
  @RabbitRPC({
    exchange: 'user',
    routingKey: 'req&res',
    queue: 'subscribe-queue',
   
  })
  public async rpcHandler(msg: {}) {
    console.log(`Received rpc message: ${JSON.stringify(msg)}`);

    return { message: 'Message from Server-B' };
  }
  
}