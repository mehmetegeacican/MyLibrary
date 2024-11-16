import { Module } from '@nestjs/common';
import { UserprofilesService } from './userprofiles.service';
import { UserprofilesController } from './userprofiles.controller';

@Module({
  controllers: [UserprofilesController],
  providers: [UserprofilesService],
})
export class UserprofilesModule {}
