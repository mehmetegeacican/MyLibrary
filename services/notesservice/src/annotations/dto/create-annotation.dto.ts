import { IsNotEmpty, IsString, IsInt, IsUUID, Min } from 'class-validator';
export class CreateAnnotationDto {

    @IsString()
    @IsNotEmpty()
    annotation:string;

    @IsNotEmpty()
    @IsString()
    comment:string;
    @IsNotEmpty()
    @IsInt()
    @Min(1, {message:"Page number must be at least 1"})
    pageNumber:number;
    @IsNotEmpty()
    @IsUUID()
    bookId:string;
    @IsNotEmpty()
    @IsString()
    userId:string;
}
