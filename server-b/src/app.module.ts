import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const uri = `amqp://admin:admin@172.20.6.22:5672/rabbit`;

@Module({ 
  imports: [
    ConfigModule,
    ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: ['.env'],
  }),
    MongooseModule.forRoot(
    `${process.env.MONGODB_URI}`
    ),
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
        connectionInitOptions: { wait: false, reject: true, timeout: 3000 },
       
      }),
    }),
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
