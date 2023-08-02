import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared.module';

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
    SharedModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
