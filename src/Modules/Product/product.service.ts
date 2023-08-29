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

@Injectable()
export class ProductService {
    constructor(private readonly _repository: ProductRepository) {}

    async findMany(query: ProductQueryDTO): Promise<ProductDTO[] | []> {
        return this._repository.findMany(query);
    }

    async findOne(dto: ProductParamDTO): Promise<ProductDTO | null> {
        const product = await this._repository.findOne(dto);

        if (product == null) throw new NotFoundError('Product Not Found');

        return product;
    }

    async register(dto: ProductCreateDTO): Promise<void> {
        await this.throwProductExists({ ...dto });

        await this._repository.register(dto);
    }

    async update(token: string, dto: ProductUpdateDTO): Promise<void> {
        await this.findOne({ token });

        await this._repository.update(token, dto);
    }

    async remove(token: string): Promise<void> {
        await this.findOne({ token });

        await this._repository.remove(token);
    }

    private async throwProductExists(dto: ProductParamDTO): Promise<void> {
        if ((await this._repository.findOne(dto)) != null)
            throw new BadRequestError(
                'There is already a product registered with that name',
            );
    }
}
