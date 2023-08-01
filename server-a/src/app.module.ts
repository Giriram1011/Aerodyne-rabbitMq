
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { SharedModule } from './shared.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

const uri =`amqp://admin:admin@172.20.6.22:5672/rabbit`;

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
      connectionInitOptions: { wait: true, reject: true, timeout: 3000 },
    }),
  }),
  UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}