import { Test, TestingModule } from '@nestjs/testing';
import { AnnotationsController } from '../annotations.controller';
import { AnnotationsService } from '../annotations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Annotation } from '../entities/annotation.entity';

describe('AnnotationsController', () => {
  let controller: AnnotationsController;
  let service: AnnotationsService;

  const mockAnnotationRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnotationsController],
      providers: [
        AnnotationsService,
        {
          provide: getRepositoryToken(Annotation),
          useValue: mockAnnotationRepository,
        },
      ],
    }).compile();

    controller = module.get<AnnotationsController>(AnnotationsController);
    service = module.get<AnnotationsService>(AnnotationsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllByUserId', () => {
    it('should return a collection of annotations for a specific user ID', async () => {
      // Given
      const userId = 'user-uuid-123';
      const expectedResult = [{ id: 'anno-1', userId, comment: 'Clean Code principles', pageNumber: 5 }];
      jest.spyOn(service, 'findManyByUserId').mockResolvedValue(expectedResult as any);

      // When
      const result = await controller.findAllByUserId(userId);

      // Then
      expect(service.findManyByUserId).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a single annotation matching the route ID parameters', async () => {
      // Given
      const targetId = 'annotation-uuid-456';
      const expectedRecord = { id: targetId, comment: 'Structural Architecture', pageNumber: 42 };
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedRecord as any);

      // When
      const result = await controller.findOne(targetId);

      // Then
      expect(service.findOne).toHaveBeenCalledWith(targetId);
      expect(result).toEqual(expectedRecord);
    });
  });

  describe('create', () => {
    it('should pass data transfer payloads to the service layer and yield the created entity', async () => {
      // Given
      const createDto = { userId: 'u-1', bookId: '9094032e-f981-44aa-9b01-327028a711a4', comment: 'Instant highlight', pageNumber: 12 , annotation: 'This is a key insight.'};
      const expectedResult = { id: 'new-uuid', ...createDto };
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult as any);

      // When
      const result = await controller.create(createDto);

      // Then
      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should forward parameters along with request payload details to apply modifications safely', async () => {
      // Given
      const targetId = 'annotation-uuid-789';
      const updateDto = { userId: 'u-1', bookId: '9094032e-f981-44aa-9b01-327028a711a4', comment: 'Modified text notes', pageNumber: 12 , annotation: 'This is a key insight.'};
      const expectedResult = { id: targetId, ...updateDto };
      jest.spyOn(service, 'update').mockResolvedValue(expectedResult as any);

      // When
      const result = await controller.update(targetId, updateDto);

      // Then
      expect(service.update).toHaveBeenCalledWith(targetId, updateDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should trigger entity deletion patterns and respond with a soft delete success message mapping', async () => {
      // Given
      const targetId = 'annotation-uuid-999';
      const expectedResponse = { message: 'Annotation has been securely soft-deleted.' };
      jest.spyOn(service, 'remove').mockResolvedValue(expectedResponse);

      // When
      const result = await controller.remove(targetId);

      // Then
      expect(service.remove).toHaveBeenCalledWith(targetId);
      expect(result).toEqual(expectedResponse);
    });
  });
});