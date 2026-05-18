import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnnotationDto } from './dto/create-annotation.dto';
import { UpdateAnnotationDto } from './dto/update-annotation.dto';
import { Annotation } from './entities/annotation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AnnotationsService {

  constructor(
    @InjectRepository(Annotation)
    private readonly annotationRepository: Repository<Annotation>,) {
  }

  create(createAnnotationDto: CreateAnnotationDto) {
    return 'This action adds a new annotation';
  }

  findAll() {
    return `This action returns all annotations`;
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
      throw new NotFoundException("Annotation could not be found");
    }
    return annotation;
  }

  update(id: number, updateAnnotationDto: UpdateAnnotationDto) {
    return `This action updates a #${id} annotation`;
  }

  async remove(id: string): Promise<{ message: string }> {
    const annotation = await this.findOne(id);
    await this.annotationRepository.softDelete(annotation.id);
    return { message: "Annotation have been successfully deleted" };
  }
}
