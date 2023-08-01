import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User,UserSchema } from './schemas/user.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { AppService } from 'src/app.service';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
  // @Inject(AmqpConnection) private rabbit: AmqpConnection

  private readonly amqpConnection: AmqpConnection,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<{ status: number; message: string; data: User }> {
    const createdUser = await this.userModel.create(createUserDto);
    return { status: 201, message: 'User created successfully!', data: createdUser };
  }
  
  async findAll(): Promise<{ status: number; message: string; data: any[] }> {
    const {data} = await this.roleGet();
    const userList = await this.userModel.find({}).exec();
 
    return { status: 200, message: 'User list & role retrieved successfully!', data: userList.map((x:any)=>{
      const role = data.find((role) => role._id.toString() === x.role_id);
      return role ? {...x._doc,roleName:role.role_name} : x
    }) };
  }
  
  
  

  async roleGet(): Promise<any> {
    let exchange = 'user';
    let routingKey = 'getRoleInfo';
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
  async findOne(id: string): Promise<{ status: number; message: string; data: User }> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return { status: 200, message: 'User retrieved successfully!', data: user };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<{ status: number; message: string; data: User }> {
    const updatedUser = await this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return { status: 200, message: 'User updated successfully!', data: updatedUser };
  }

  async remove(id: string): Promise<{ status: number; message: string; data: User }> {
    const deletedUser = await this.userModel.findByIdAndRemove(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return { status: 200, message: 'User deleted successfully!', data: deletedUser };
  }
}
