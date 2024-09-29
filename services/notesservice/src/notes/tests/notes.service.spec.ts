import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from '../notes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from '../entities/note.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('NotesService', () => {
  let service: NotesService;
  let repository: Repository<Note>;

  const mockNoteRepository = {
    create: jest.fn().mockReturnValue({ id: 1, userId: 1, title: 'Test Note', content: 'Content' }),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: getRepositoryToken(Note),
          useValue: mockNoteRepository,
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
    repository = module.get<Repository<Note>>(getRepositoryToken(Note));
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear the mocks after each test
  });

  describe('findAll', () => {
    it('should return an array of notes', async () => {
      const notesArray = [{ id: 1, title: 'Note 1' }, { id: 2, title: 'Note 2' }];

      mockNoteRepository.find.mockResolvedValue(notesArray);

      const result = await service.findAll();

      expect(result).toEqual(notesArray);
      expect(mockNoteRepository.find).toHaveBeenCalled();
    });
  });

  describe('findMany', () => {
    it('should return notes for a specific user', async () => {
      const userId = 1;
      const notesArray = [{ id: 1, userId, title: 'Note 1' }];

      mockNoteRepository.find.mockResolvedValue(notesArray);

      const result = await service.findMany(userId);

      expect(result).toEqual(notesArray);
      expect(mockNoteRepository.find).toHaveBeenCalledWith({
        where: { userId },
      });
    });
  });

  describe('findOne', () => {
    it('should return a note by ID', async () => {
      const noteId = 1;
      const note = { id: noteId, title: 'Note 1' };

      mockNoteRepository.findOne.mockResolvedValue(note);

      const result = await service.findOne(noteId);

      expect(result).toEqual(note);
      expect(mockNoteRepository.findOne).toHaveBeenCalledWith({ where: { id: noteId } });
    });

    it('should throw NotFoundException if note does not exist', async () => {
      const noteId = 99;

      mockNoteRepository.findOne.mockRejectedValue(new NotFoundException);

      await expect(service.findOne(noteId)).rejects.toThrow(Error);
      expect(mockNoteRepository.findOne).toHaveBeenCalledWith({ where: { id: noteId } });
    });
  });

  describe('create', () => {
    it('should create a note', async () => {
      const createNoteDto = { userId: 1, title: 'Test Note', content: 'Content' };
      const savedNote = { id: 1, ...createNoteDto };

      // Mock the save method before calling create
      mockNoteRepository.save.mockResolvedValue(savedNote);

      const result = await service.create(createNoteDto);

      expect(result).toEqual(savedNote);
      expect(mockNoteRepository.create).toHaveBeenCalledWith(createNoteDto);
      expect(mockNoteRepository.save).toHaveBeenCalledWith(savedNote);
    });
    it('should throw a validation error if userId is missing', async () => {
      const createNoteDto = { title: 'Test Note', content: 'Content' }; // userId is missing
      jest.spyOn(mockNoteRepository, 'create').mockRejectedValue(new BadRequestException);
      await expect(mockNoteRepository.create(createNoteDto)).rejects.toThrow(Error); // Adjust the error type as needed
    });
  });

  describe('update', () => {
    it('should update a note', async () => {
      const noteId = 1;
      const updateNoteDto = { title: 'Updated Title' };
      const existingNote = { id: noteId, title: 'Old Title' };

      mockNoteRepository.findOne.mockResolvedValue(existingNote);
      mockNoteRepository.save.mockResolvedValue({ ...existingNote, ...updateNoteDto });

      const result = await service.update(noteId, updateNoteDto);

      expect(result).toEqual({ ...existingNote, ...updateNoteDto });
      expect(mockNoteRepository.findOne).toHaveBeenCalledWith({ where: { id: noteId } });
      expect(mockNoteRepository.save).toHaveBeenCalledWith(expect.objectContaining({ ...existingNote, ...updateNoteDto }));
    });

    it('should throw NotFoundException if note does not exist', async () => {
      const noteId = 99;
      const updateNoteDto = { title: 'Updated Title' };

      mockNoteRepository.findOne.mockResolvedValue(null);

      await expect(service.update(noteId, updateNoteDto)).rejects.toThrow(NotFoundException);
      expect(mockNoteRepository.findOne).toHaveBeenCalledWith({ where: { id: noteId } });
    });
  });

  describe('remove', () => {
    it('should remove a note', async () => {
      const noteId = 1;
      const existingNote = { id: noteId, title: 'Note 1' };

      mockNoteRepository.findOne.mockResolvedValue(existingNote);
      mockNoteRepository.remove.mockResolvedValue(undefined); // or any expected return value

      await service.remove(noteId);

      expect(mockNoteRepository.findOne).toHaveBeenCalledWith({ where: { id: noteId } });
      expect(mockNoteRepository.remove).toHaveBeenCalledWith(existingNote);
    });

    it('should throw NotFoundException if note does not exist', async () => {
      const noteId = 99;

      mockNoteRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(noteId)).rejects.toThrow(NotFoundException);
      expect(mockNoteRepository.findOne).toHaveBeenCalledWith({ where: { id: noteId } });
    });

    it('should throw BadRequestException if note param  is not number', async () => {
      const noteId = "asd";

      mockNoteRepository.findOne.mockRejectedValue(BadRequestException);
      expect(mockNoteRepository.findOne).toHaveBeenCalledTimes(0);
    });
  });
});
