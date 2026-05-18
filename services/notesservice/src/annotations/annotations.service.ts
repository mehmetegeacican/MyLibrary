import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnnotationDto } from './dto/create-annotation.dto';
import { UpdateAnnotationDto } from './dto/update-annotation.dto';
import { Annotation } from './entities/annotation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ANNOTATION_MESSAGES, EXCEPTION_MESSAGES } from 'common/constants';

@Injectable()
export class AnnotationsService {

  constructor(
    @InjectRepository(Annotation)
    private readonly annotationRepository: Repository<Annotation>,) {
  }

  async create(createAnnotationDto: CreateAnnotationDto): Promise<Annotation> {
    const annotation = this.annotationRepository.create(createAnnotationDto);
    return await this.annotationRepository.save(annotation);
  }

  async findManyByUserId(userId: string): Promise<Annotation[]> {
    return await this.annotationRepository.find({
      where: { userId },
    });
  }

  async findOne(id: string): Promise<Annotation> {
    const annotation = await this.annotationRepository.findOne({
      where: { id },
    });
    if (!annotation) {
      throw new NotFoundException(EXCEPTION_MESSAGES.NOT_FOUND);
    }
    return annotation;
  }

  async update(id: string, updateAnnotationDto: UpdateAnnotationDto): Promise<Annotation> {
    const annotation = await this.findOne(id);
    Object.assign(annotation, updateAnnotationDto);
    return await this.annotationRepository.save(annotation);
  }

  async remove(id: string): Promise<{ message: string }> {
    const annotation = await this.findOne(id);
    await this.annotationRepository.softDelete(annotation.id);
    return { message: ANNOTATION_MESSAGES.DELETE_SUCCESS };
  }
}
