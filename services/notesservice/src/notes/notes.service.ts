import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotesService {

  constructor(
    @InjectRepository(Note)
    private readonly noteRepository:
    Repository<Note>){

    }

  async create(createNoteDto: CreateNoteDto) {
    const note = this.noteRepository.create(createNoteDto);
    return await this.noteRepository.save(note);
  }

  async findAll() {
    return await this.noteRepository.find();
  }

  async findMany(id:number){
    return await this.noteRepository.find({
      where:{
        userId:id
      }
    });
  }

  async findOne(id: number) {
    return await this.noteRepository.findOne({
      where:{
        id
      }
    });
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {

    const note = await this.findOne(id);
    if(!note){
      throw new NotFoundException();
    }
    Object.assign(note,updateNoteDto);
    return await this.noteRepository.save(note);
  }

  async remove(id: number) {
    const note = await this.findOne(id);
    if(!note){
      throw new NotFoundException();
    }

    return await this.noteRepository.remove(note);
  }
}
