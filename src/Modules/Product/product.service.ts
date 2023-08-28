import { Injectable, NotImplementedException } from '@nestjs/common';
import { ProductRepository } from './Repository/product.repository';
import { ProductCreateDTO } from './DTOs/product.createDTO';
import { ProductParamDTO } from './DTOs/product.paramDTO';
import { ProductQueryDTO } from './DTOs/product.queryDTO';
import { ProductUpdateDTO } from './DTOs/product.updateDTO';
import { ProductDTO } from './DTOs/productDTO';

@Injectable()
export class ProductService {
    constructor(private readonly _repository: ProductRepository) {}

    async findMany(dto: ProductQueryDTO): Promise<ProductDTO[] | []> {
        throw new NotImplementedException('');
    }

    async findOne(dto: ProductParamDTO): Promise<ProductDTO | null> {
        throw new NotImplementedException('');
    }

    async register(dto: ProductCreateDTO): Promise<void> {
        throw new NotImplementedException('');
    }

    async update(dto: ProductUpdateDTO): Promise<void> {
        throw new NotImplementedException('');
    }

    async remove(token: string): Promise<void> {
        throw new NotImplementedException('');
    }
}
