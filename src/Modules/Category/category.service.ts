import { Injectable } from '@nestjs/common';
import {
    CategoryUpdateDTO,
    CategoryCreateDTO,
    CategoryParamDTO,
    CategoryQueryDTO,
    CategoryDTO,
    CategoryRepository,
} from 'modules/Category/@namespace';
import { ProductDTO, ProductFilterDTO } from 'modules/Product/@namespace';
import { BadRequestError, NotFoundError } from 'exceptions/@namespace';

@Injectable()
export class CategoryService {
    constructor(private readonly _repository: CategoryRepository) {}

    async findProducts(
        dto: ProductFilterDTO,
    ): Promise<{ total: number; data: ProductDTO[] }> {
        return await this._repository.findProducts(dto);
    }

    async findMany(
        query: CategoryQueryDTO,
    ): Promise<{ total: number; data: CategoryDTO[] }> {
        return this._repository.findMany(query);
    }

    async findOne(dto: CategoryParamDTO): Promise<CategoryDTO> {
        const category = await this._repository.findOne(dto);

        if (category == null) throw new NotFoundError('Category Not Found');

        return category;
    }

    async register(dto: CategoryCreateDTO): Promise<void> {
        await this.throwUniqueCategoryName({ ...dto });

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

    public async throwAvailableCategories(categoriesIDs: string[]) {
        categoriesIDs.forEach(async (token) => {
            if ((await this._repository.findOne({ token })) == null)
                throw new BadRequestError(
                    `This ${token} category is not registered in the database`,
                );
        });
    }
    private async throwUniqueCategoryName(
        dto: CategoryParamDTO,
    ): Promise<void> {
        if ((await this._repository.findOne(dto)) != null)
            throw new BadRequestError(
                'There is already a category registered with that name',
            );
    }
}
