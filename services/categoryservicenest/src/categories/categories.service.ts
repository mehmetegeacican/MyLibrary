import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getCache, setCache, clearCache } from '../../common/cache/redis.cache';
import { clear } from 'console';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>) {

  }

  async create(createCategoryDto: CreateCategoryDto) {
    const ct = this.categoryRepository.create(createCategoryDto);
    await clearCache(`categories`);
    return await this.categoryRepository.save(ct);
  }

  async findAll() {
    const cacheKey = `categories`;
    const cached = await getCache(cacheKey);
    if (cached) {
      return cached;
    }
    return this.categoryRepository.find();
  }

  async findMany(id: number) {
    const cacheKey = `categories`;
    const cached = await getCache(cacheKey);
    if (cached) {
      return cached;
    }
    const result = await this.categoryRepository.find({
      where: {
        user_id: id
      }
    });
    await setCache(cacheKey, result);
    return result;
  }

  async findOne(id: number) {
    const cacheKey = `categories:${id}`;
    const cached = await getCache(cacheKey);
    if (cached) {
      return cached;
    }
    const result = await this.categoryRepository.findOne({
      where: {
        id
      }
    });
    if(result){
      await setCache(cacheKey, result);
    }
    return result;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const ct = await this.findOne(id);
    if (!ct) {
      throw new NotFoundException();
    }
    Object.assign(ct, updateCategoryDto);
    await clearCache(`categories`);
    await clearCache(`categories:${id}`);
    return await this.categoryRepository.save(ct);
  }

  async remove(id: number) {
    const ct = await this.findOne(id);
    if (!ct) {
      throw new NotFoundException();
    }
    await clearCache(`categories`);
    await clearCache(`categories:${id}`);
    return await this.categoryRepository.remove(ct);
  }
}
