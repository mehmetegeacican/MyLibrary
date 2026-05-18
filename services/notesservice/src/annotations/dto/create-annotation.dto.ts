import { IsNotEmpty, IsString, IsInt, IsUUID, Min } from 'class-validator';
export class CreateAnnotationDto {
    @IsNotEmpty()
    @IsString()
    comment:string;
    @IsNotEmpty()
    @IsInt()
    @Min(1, {message:"Page number must be at least 1"})
    pageNumber:number;
    @IsNotEmpty()
    @IsString()
    bookId:string;
    @IsNotEmpty()
    @IsString()
    userId:string;
}
