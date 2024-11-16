import { Test, TestingModule } from '@nestjs/testing';
import { UserprofilesController } from './userprofiles.controller';
import { UserprofilesService } from './userprofiles.service';

describe('UserprofilesController', () => {
  let controller: UserprofilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserprofilesController],
      providers: [UserprofilesService],
    }).compile();

    controller = module.get<UserprofilesController>(UserprofilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
