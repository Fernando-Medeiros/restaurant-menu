import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './Repository/category.repository';
import { CategoryCreateDTO } from './DTOs/category.createDTO';
import { CategoryUpdateDTO } from './DTOs/category.updateDTO';
import { CategoryParamDTO } from './DTOs/category.paramDTO';
import { CategoryQueryDTO } from './DTOs/category.queryDTO';
import { CategoryDTO } from './DTOs/categoryDTO';
import { ProductDTO } from '../Product/DTOs/productDTO';
import NotFoundError from 'errors/NotFoundError';

@Injectable()
export class CategoryService {
    constructor(private readonly _repository: CategoryRepository) {}

    async findProducts(dto: CategoryParamDTO): Promise<ProductDTO[] | []> {
        return await this._repository.findProducts(dto);
    }

    async findMany(query: CategoryQueryDTO): Promise<CategoryDTO[] | []> {
        return this._repository.findMany(query);
    }

    async findOne(dto: CategoryParamDTO): Promise<CategoryDTO | null> {
        const category = await this._repository.findOne(dto);

        if (category == null) throw new NotFoundError('Category Not Found');

        return category;
    }

    async register(dto: CategoryCreateDTO): Promise<void> {
        await this._repository.register(dto);
    }

    async update(token: string, dto: CategoryUpdateDTO): Promise<void> {
        await this.findOne({ token });

        await this._repository.update(token, dto);
    }

    async remove(token: string): Promise<void> {
        await this.findOne({ token });

        await this._repository.remove(token);
    }
}
