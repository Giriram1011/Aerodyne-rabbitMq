import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User,UserSchema } from './schemas/user.schemas';
import { SharedModule } from '../shared.module';
@Module({
  imports:[
    SharedModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
    ],
  controllers: [UserController],
  providers: [UserService
        // { provide: AmqpConnection, useFactory: () => AmqpConnection }
  ]
})
export class UserModule {}
