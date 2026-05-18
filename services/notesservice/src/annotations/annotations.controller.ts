import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpStatus, HttpCode } from '@nestjs/common';
import { AnnotationsService } from './annotations.service';
import { CreateAnnotationDto } from './dto/create-annotation.dto';
import { UpdateAnnotationDto } from './dto/update-annotation.dto';
import { ANNOTATION_MESSAGES, API_ROUTES } from '../../common/constants';

@Controller(`${API_ROUTES.BASE_PREFIX}/${API_ROUTES.ANNOTATIONS}`)
export class AnnotationsController {
  constructor(private readonly annotationsService: AnnotationsService) { }

  @Get(`/${API_ROUTES.ALL}/${API_ROUTES.USER_ID_PARAM}`)
  async findAllByUserId(@Param('userId') userId: string) {
    const result = await this.annotationsService.findManyByUserId(userId);
    return result;
  }

  @Get(API_ROUTES.ID_PARAM)
  async findOne(@Param('id') id: string) {
    const result = await this.annotationsService.findOne(id);
    return result;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAnnotationDto: CreateAnnotationDto) {
    const result = await this.annotationsService.create(createAnnotationDto);
    return result;
  }

  @Put(API_ROUTES.ID_PARAM)
  async update(@Param('id') id: string, @Body() updateAnnotationDto: UpdateAnnotationDto) {
    const result =  await this.annotationsService.update(id, updateAnnotationDto);
    return result;
  }

  @Delete(API_ROUTES.ID_PARAM)
  remove(@Param('id') id: string) {
    return this.annotationsService.remove(id);
  }
}
