import { Injectable, NotImplementedException } from '@nestjs/common';
import { CategoryRepository } from './Repository/category.repository';
import { CategoryCreateDTO } from './DTOs/category.createDTO';
import { CategoryUpdateDTO } from './DTOs/category.updateDTO';
import { CategoryParamDTO } from './DTOs/category.paramDTO';
import { CategoryQueryDTO } from './DTOs/category.queryDTO';
import { CategoryDTO } from './DTOs/categoryDTO';
import { ProductDTO } from '../Product/DTOs/productDTO';

@Injectable()
export class CategoryService {
    constructor(private readonly _repository: CategoryRepository) {}

    async findProducts(dto: CategoryParamDTO): Promise<ProductDTO[] | []> {
        throw new NotImplementedException('');
    }

    async findMany(query: CategoryQueryDTO): Promise<CategoryDTO[] | []> {
        throw new NotImplementedException('');
    }

    async findOne(dto: CategoryParamDTO): Promise<CategoryDTO | null> {
        throw new NotImplementedException('');
    }

    async register(dto: CategoryCreateDTO): Promise<void> {
        throw new NotImplementedException('');
    }

    async update(dto: CategoryUpdateDTO): Promise<void> {
        throw new NotImplementedException('');
    }

    async remove(token: string): Promise<void> {
        throw new NotImplementedException('');
    }
}
