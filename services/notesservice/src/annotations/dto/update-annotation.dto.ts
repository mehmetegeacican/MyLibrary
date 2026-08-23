import { PartialType } from '@nestjs/mapped-types';
import { CreateAnnotationDto } from './create-annotation.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateAnnotationDto extends PartialType(CreateAnnotationDto) {
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    bookId: string;
}
