import { Injectable } from '@nestjs/common';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import {
    ProductCreateDTO,
    ProductDTO,
    ProductParamDTO,
    ProductQueryDTO,
    ProductUpdateDTO,
} from 'modules/Product/@namespace';

@Injectable()
export class ProductRepository {
    constructor(private readonly _context: PrismaService) {}

    async findMany(query: ProductQueryDTO): Promise<ProductDTO[] | []> {
        const { order, sort } = query;

        const orderBy = {
            token: { token: order },
            name: { name: order },
            price: { price: order },
            createdAt: { createdAt: order },
        };

        return this._context.product.findMany({
            take: Math.abs(+query.take),
            skip: Math.abs(+query.skip),
            orderBy: orderBy[sort],
            include: { categories: true },
        });
    }

    async findOne(dto: ProductParamDTO): Promise<ProductDTO | null> {
        const { token, name } = dto;

        const query = token ? { token } : name ? { name } : null;

        if (query == null) return null;

        return this._context.product.findFirst({
            where: query,
            include: { categories: true },
        });
    }

    async register(dto: ProductCreateDTO): Promise<void> {
        await this._context.product.create({ data: dto });
    }

    async update(token: string, dto: ProductUpdateDTO): Promise<void> {
        await this._context.product.update({ where: { token }, data: dto });
    }

    async remove(token: string): Promise<void> {
        await this._context.product.delete({ where: { token } });
    }
}
