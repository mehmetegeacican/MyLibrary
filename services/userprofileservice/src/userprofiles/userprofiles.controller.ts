import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserprofilesService } from './userprofiles.service';
import { CreateUserprofileDto } from './dto/create-userprofile.dto';
import { UpdateUserprofileDto } from './dto/update-userprofile.dto';

@Controller('userprofiles')
export class UserprofilesController {
  constructor(private readonly userprofilesService: UserprofilesService) {}

  @Post()
  create(@Body() createUserprofileDto: CreateUserprofileDto) {
    return this.userprofilesService.create(createUserprofileDto);
  }

  @Get()
  findAll() {
    return this.userprofilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userprofilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserprofileDto: UpdateUserprofileDto) {
    return this.userprofilesService.update(+id, updateUserprofileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userprofilesService.remove(+id);
  }
}
