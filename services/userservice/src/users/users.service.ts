import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>
  ){

  }

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser); 
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.find({
      where:{
        id:id
      }
    }) 
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if(!user){
      throw new NotFoundException();
    }
    Object.assign(user,updateUserDto);

    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if(!user){
      throw new NotFoundException();
    }
    return await this.userRepository.remove(user);
  }
}
