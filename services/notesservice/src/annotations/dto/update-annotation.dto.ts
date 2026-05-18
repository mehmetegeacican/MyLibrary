import { PartialType } from '@nestjs/mapped-types';
import { CreateAnnotationDto } from './create-annotation.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateAnnotationDto extends PartialType(CreateAnnotationDto) {
    @IsNotEmpty()
    @IsUUID('4', { message: 'userId must be a valid UUID version 4' })
    userId: string;

    @IsNotEmpty()
    @IsString()
    bookId: string;
}
