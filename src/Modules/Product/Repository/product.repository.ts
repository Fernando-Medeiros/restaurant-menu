import { Injectable, NotImplementedException } from '@nestjs/common';
import { ProductQueryDTO } from '../DTOs/product.queryDTO';
import { ProductParamDTO } from '../DTOs/product.paramDTO';
import { ProductCreateDTO } from '../DTOs/product.createDTO';
import { ProductUpdateDTO } from '../DTOs/product.updateDTO';
import { ProductDTO } from '../DTOs/productDTO';

@Injectable()
export class ProductRepository {
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

    async remove(dto: ProductDTO): Promise<void> {
        throw new NotImplementedException('');
    }
}
