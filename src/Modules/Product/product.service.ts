import { Injectable } from '@nestjs/common';
import {
    ProductCreateDTO,
    ProductDTO,
    ProductParamDTO,
    ProductQueryDTO,
    ProductRepository,
    ProductUpdateDTO,
} from 'modules/Product/@namespace';
import { BadRequestError, NotFoundError } from 'exceptions/@namespace';
import { CategoryService } from 'modules/Category/@namespace';

@Injectable()
export class ProductService {
    constructor(
        private readonly _repository: ProductRepository,
        private readonly _categoryService: CategoryService,
    ) {}

    async findMany(
        query: ProductQueryDTO,
    ): Promise<{ total: number; data: ProductDTO[] }> {
        return this._repository.findMany(query);
    }

    async findOne(dto: ProductParamDTO): Promise<ProductDTO> {
        const product = await this._repository.findOne(dto);

        if (product == null) throw new NotFoundError('Product Not Found');

        return product;
    }

    async register(dto: ProductCreateDTO): Promise<void> {
        await this.throwUniqueProductName({ ...dto });

        await this._categoryService.throwAvailableCategories(dto.categoriesIDs);

        await this._repository.register(dto);
    }

    async update(token: string, dto: ProductUpdateDTO): Promise<void> {
        const product = await this.findOne({ token });

        await this.throwUniqueProductName({ ...dto });

        await this._categoryService.throwAvailableCategories(dto.categoriesIDs);

        await this._repository.update(token, {
            ...dto,
            categoriesIDs: [
                ...new Set([...dto.categoriesIDs, ...product.categoriesIDs]),
            ],
        });
    }

    async remove(token: string): Promise<void> {
        await this.findOne({ token });

        await this._repository.remove(token);
    }

    private async throwUniqueProductName(dto: ProductParamDTO): Promise<void> {
        if ((await this._repository.findOne(dto)) != null)
            throw new BadRequestError(
                'There is already a product registered with that name',
            );
    }
}
