import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>) {

  }

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async findAll() {
    return this.categoryRepository.find();
  }

  async findMany(id:number) {
    return await this.categoryRepository.find({
      where:{
        user_id:id
      }
    });
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOne({
      where:{
        id
      }
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number) {
    const ct = await this.findOne(id);
    if(!ct){
      throw new NotFoundException();
    }

    return await this.categoryRepository.remove(ct);
  }
}
