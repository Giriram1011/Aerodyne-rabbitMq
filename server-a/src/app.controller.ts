import { Controller, Get } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly amqpConnection: AmqpConnection,private readonly service:AppService) {}

  @Get('request')
  async test(){
    return this.service.request()
  }
  
  @Get('publish')
  async message() {
    try {
      let exchange = 'user';
      let routingKey = 'getUserInfo';
      let payload = { key: 'value' };
      await this.amqpConnection.publish(exchange, routingKey, payload);
      return { message: 'Message sent successfully.Fire & forgot' };
    } catch (error) {
      console.error('Error during message publishing:', error);
      throw error; 
    }
  }

  
}
