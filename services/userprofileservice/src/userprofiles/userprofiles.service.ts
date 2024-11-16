import { Injectable } from '@nestjs/common';
import { CreateUserprofileDto } from './dto/create-userprofile.dto';
import { UpdateUserprofileDto } from './dto/update-userprofile.dto';

@Injectable()
export class UserprofilesService {
  create(createUserprofileDto: CreateUserprofileDto) {
    return 'This action adds a new userprofile';
  }

  findAll() {
    return `This action returns all userprofiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userprofile`;
  }

  update(id: number, updateUserprofileDto: UpdateUserprofileDto) {
    return `This action updates a #${id} userprofile`;
  }

  remove(id: number) {
    return `This action removes a #${id} userprofile`;
  }
}
