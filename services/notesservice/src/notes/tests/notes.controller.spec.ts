import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from '../notes.controller';
import { NotesService } from '../notes.service';
import { getRepositoryToken } from '@nestjs/typeorm'; // This is used to mock the repository
import { Note } from '../entities/note.entity'; // Import your entity
import { CreateNoteDto } from '../dto/create-note.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateNoteDto } from '../dto/update-note.dto';

describe('NotesController', () => {
  let controller: NotesController;
  let service: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        NotesService,
        {
          provide: getRepositoryToken(Note), // This mocks the repository
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
          },
        },
      ],
    }).compile();

    controller = module.get<NotesController>(NotesController);
    service = module.get<NotesService>(NotesService);
  });

  describe('findAll', () => {
    it('should return an array of Notes', async () => {
      // Given
      const mockNotes: Note[] = [
        {
          id: 1,
          userId: 1,
          title: 'Test Note 1',
          content: 'Test Content 1',
          imagePath: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          userId: 1,
          title: 'Test Note 2',
          content: 'Test Content 2',
          imagePath: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(service, 'findMany').mockResolvedValue(mockNotes);
      // When
      const result = await controller.findAll('1');
      // Then
      expect(service.findMany).toHaveBeenCalledWith(1); // Check if findMany was called with the correct userId
      expect(result).toEqual(mockNotes);
    });
    it('should return an empty array if no notes are found for the userId', async () => {
      // Mock the service method to return an empty array
      jest.spyOn(service, 'findMany').mockResolvedValue([]);

      const result = await controller.findAll('1'); // Call the controller method

      expect(service.findMany).toHaveBeenCalledWith(1); // Check if findMany was called with the correct userId
      expect(result).toEqual([]);                       // Check if the result is an empty array
    });
    it('should return an empty array if userId is empty', async () => {
      // Mock the service method to return an empty array
      jest.spyOn(service, 'findMany').mockResolvedValue([]);

      const result = await controller.findAll(''); // Call the controller method with an empty userId

      expect(service.findMany).toHaveBeenCalledWith(0); // Check if findMany was called with 0
      expect(result).toEqual([]);                       // Check if the result is an empty array
    });
    it('should return an empty array if userId is not a number', async () => {
      // Mock the service method to return an empty array
      jest.spyOn(service, 'findMany').mockResolvedValue([]);

      const result = await controller.findAll('abc'); // Call the controller method with a non-numeric userId

      expect(service.findMany).toHaveBeenCalledWith(NaN); // Check if findMany was called with NaN
      expect(result).toEqual([]);                          // Check if the result is an empty array
    });
  });

  describe('findOne', () => {
    it('should return a single note', async () => {
      // Given
      const mockNote: Note = {
        id: 1,
        userId: 1,
        title: 'Test Note',
        content: 'Test Content',
        imagePath: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockNote);
      // When
      const result = await controller.findOne('1');
      // Then
      expect(service.findOne).toHaveBeenCalledWith(1); // Check if findOne was called with the correct ID
      expect(result).toEqual(mockNote); // Check if the result matches the mock note
    });
    it('should return null if no note is found', async () => {
      // Given
      jest.spyOn(service, 'findOne').mockResolvedValue(null);
      //When
      const result = await controller.findOne('1');
      // Then
      expect(service.findOne).toHaveBeenCalledWith(1); // Check if findOne was called with the correct ID
      expect(result).toBeNull();                      // Check if the result is null
    });
  });

  describe('create', () => {
    it('should create a single note', async () => {
      const createNoteDto: CreateNoteDto = {
        userId: 1,
        title: 'Test Note',
        content: 'Test Content',
        imagePath: '',
      };

      const mockNote: Note = {
        id: 1,
        userId: 1,
        title: 'Test Note',
        content: 'Test Content',
        imagePath: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock the service method to return the mock note
      jest.spyOn(service, 'create').mockResolvedValue(mockNote);

      const result = await controller.create(createNoteDto); // Call the controller method with the DTO

      expect(service.create).toHaveBeenCalledWith(createNoteDto); // Check if create was called with the correct DTO
      expect(result).toEqual(mockNote);                          // Check if the result matches the mock note
    });
    it('should handle service errors gracefully', async () => {
      // Given
      const createNoteDto: CreateNoteDto = {
        userId: 1,
        title: 'Test Note',
        content: 'Test Content',
        imagePath: '',
      };
      jest.spyOn(service, 'create').mockRejectedValue(new Error('Database error'));
      // When
      await expect(controller.create(createNoteDto)).rejects.toThrow(Error); // Expect a general error
      // Then
      expect(service.create).toHaveBeenCalledWith(createNoteDto); // Ensure service.create was called
    });
    it('should throw BadRequestException for invalid DTO', async () => {
      const createNoteDto: CreateNoteDto = {
        userId: null, // Simulate invalid userId (should be a number)
        title: '', // Simulate invalid title (should not be empty)
        content: 'Test Content',
        imagePath: '',
      };
      jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException);
      // Expect the create method to throw a BadRequestException
      await expect(controller.create(createNoteDto)).rejects.toThrow(Error);
      // Ensure that service.create was not called
      expect(service.create).toHaveBeenCalledWith(createNoteDto);
    });
  });

  describe('update', () => {
    it('should update a single note', async () => {
      const updateNoteDto: UpdateNoteDto = {
        title: 'Updated Title',
        content: 'Updated Content',
        imagePath: 'updated/path/to/image.jpg',
      };

      const mockNote: Note = {
        id: 1,
        userId: 1,
        title: 'Updated Title',
        content: 'Updated Content',
        imagePath: 'updated/path/to/image.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock the service's update method
      jest.spyOn(service, 'update').mockResolvedValue(mockNote);

      const result = await controller.update('1', updateNoteDto);

      expect(result).toEqual(mockNote); // Ensure the result matches the updated note
      expect(service.update).toHaveBeenCalledWith(1, updateNoteDto); // Check if service.update was called with correct parameters
    });
    it('should throw NotFoundException if note does not exist', async () => {
      const updateNoteDto: UpdateNoteDto = {
        title: 'Updated Title',
        content: 'Updated Content',
        imagePath: 'updated/path/to/image.jpg',
      };

      // Mock the service's update method to throw a NotFoundException
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException('Note not found'));

      await expect(controller.update('99', updateNoteDto)).rejects.toThrow(NotFoundException);
      expect(service.update).toHaveBeenCalledWith(99, updateNoteDto); // Ensure the service was called with the correct ID
    });
  });

  describe('delete', () => {
    it('should delete a single note', async () => {
      const mockNoteId = 1;

      // Mock the service's remove method
      jest.spyOn(service, 'remove').mockResolvedValue(undefined); // or any other return value you expect

      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(mockNoteId); // Ensure service.remove was called with correct ID
    });
    it('should throw NotFoundException if note does not exist', async () => {
      const mockNoteId = 99;
  
      // Mock the service's remove method to throw a NotFoundException
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException('Note not found'));
  
      await expect(controller.remove('99')).rejects.toThrow(NotFoundException);
      expect(service.remove).toHaveBeenCalledWith(mockNoteId); // Ensure service was called with the correct ID
    });
  });



  // Your other tests...
});
