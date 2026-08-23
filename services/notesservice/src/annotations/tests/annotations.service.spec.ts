import { Test, TestingModule } from '@nestjs/testing';
import { AnnotationsService } from '../annotations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Annotation } from '../entities/annotation.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const NOT_FOUND = 'The requested resource was not found or has been soft-deleted.';

describe('AnnotationsService', () => {
  let service: AnnotationsService;
  let repository: Repository<Annotation>;

  const mockAnnotationRepository = {
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnnotationsService,
        {
          provide: getRepositoryToken(Annotation),
          useValue: mockAnnotationRepository,
        },
      ],
    }).compile();

    service = module.get<AnnotationsService>(AnnotationsService);
    repository = module.get<Repository<Annotation>>(getRepositoryToken(Annotation));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should successfully build and save a new annotation instance', async () => {
      // Given
      const dto = { userId: 'user-uuid', bookId: '9094032e-f981-44aa-9b01-327028a711a4', comment: 'Great read!', pageNumber: 10, annotation: 'This is a key insight.' };
      const expectedResult = { id: 'annotation-uuid', ...dto };

      mockAnnotationRepository.create.mockReturnValue(expectedResult);
      mockAnnotationRepository.save.mockResolvedValue(expectedResult);

      // When
      const result = await service.create(dto);

      // Then
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(expectedResult);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findManyByUserId', () => {
    it('should return a collection of active annotations belonging to a user', async () => {
      // Given
      const userId = 'user-uuid';
      const expectedCollection = [{ id: '1', userId, comment: 'Note 1' }];

      mockAnnotationRepository.find.mockResolvedValue(expectedCollection);

      // When
      const result = await service.findManyByUserId(userId);

      // Then
      expect(repository.find).toHaveBeenCalledWith({ where: { userId }, relations: ['book'] });
      expect(result).toEqual(expectedCollection);
    });
  });

  describe('findOne', () => {
    it('should return a single annotation instance if it exists in the database', async () => {
      // Given
      const targetId = 'annotation-uuid';
      const expectedRecord = { id: targetId, comment: 'Isolated comment' };

      mockAnnotationRepository.findOne.mockResolvedValue(expectedRecord);

      // When
      const result = await service.findOne(targetId);

      // Then
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: targetId }, relations: ['book'] });
      expect(result).toEqual(expectedRecord);
    });

    it('should throw a NotFoundException if no matching annotation is found', async () => {
      // Given
      const fakeId = 'missing-uuid';
      mockAnnotationRepository.findOne.mockResolvedValue(null);

      // When & Then
      await expect(service.findOne(fakeId)).rejects.toThrow(
        new NotFoundException(NOT_FOUND),
      );
    });
  });

  describe('update', () => {
    it('should update the record and return the fresh result', async () => {
      // Given
      const targetId = 'annotation-uuid';
      const updateDto = { comment: 'Updated text', bookId: 'b1', userId: 'u1' };
      const updatedRecord = { id: targetId, ...updateDto };

      mockAnnotationRepository.update.mockResolvedValue({ affected: 1, raw: {}, generatedMaps: [] });
      jest.spyOn(service, 'findOne').mockResolvedValue(updatedRecord as any);

      // When
      const result = await service.update(targetId, updateDto);

      // Then
      expect(repository.update).toHaveBeenCalledWith(targetId, updateDto);
      expect(service.findOne).toHaveBeenCalledWith(targetId);
      expect(result).toEqual(updatedRecord);
    });
    
    it('should throw NotFoundException when no record is affected', async () => {
      // Given
      const targetId = 'nonexistent-uuid';
      const updateDto = { comment: 'Updated text' };

      mockAnnotationRepository.update.mockResolvedValue({ affected: 0, raw: {}, generatedMaps: [] });

      // When / Then
      await expect(service.update(targetId, updateDto as any)).rejects.toThrow(NotFoundException);
      expect(repository.update).toHaveBeenCalledWith(targetId, updateDto);
    });
  });

  describe('remove', () => {
    it('should successfully execute soft delete and return a clear confirmation message', async () => {
      // Given
      const targetId = 'annotation-uuid';
      const existingRecord = { id: targetId, userId: 'u1', bookId: 'b1' };

      mockAnnotationRepository.findOne.mockResolvedValue(existingRecord);
      mockAnnotationRepository.softDelete.mockResolvedValue({ affected: 1 });

      // When
      const result = await service.remove(targetId);

      // Then
      expect(mockAnnotationRepository.findOne).toHaveBeenCalledWith({ where: { id: targetId }, relations: ['book'] });
      expect(repository.softDelete).toHaveBeenCalledWith(targetId);
      expect(result).toEqual({ message: 'Annotation has been securely soft-deleted.' });
    });

    it('should throw a NotFoundException if soft delete target does not exist', async () => {
      // Given
      const badId = 'already-gone-uuid';
      mockAnnotationRepository.findOne.mockResolvedValue(null);

      // When & Then
      await expect(service.remove(badId)).rejects.toThrow(
        new NotFoundException(NOT_FOUND),
      );

      expect(mockAnnotationRepository.findOne).toHaveBeenCalledWith({ where: { id: badId }, relations: ['book'] });
      expect(repository.softDelete).not.toHaveBeenCalled();
    });
  });
});