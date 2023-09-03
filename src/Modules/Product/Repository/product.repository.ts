import { Injectable } from '@nestjs/common';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import {
    ProductDTO,
    ProductQueryDTO,
    ProductParamDTO,
    ProductCreateDTO,
    ProductUpdateDTO,
} from 'modules/Product/@namespace';

@Injectable()
export class ProductRepository {
    constructor(private readonly _context: PrismaService) {}

    async findMany(
        query: ProductQueryDTO,
    ): Promise<{ total: number; data: ProductDTO[] }> {
        const [total, data] = await Promise.all([
            this._context.product.count(),
            this._context.product.findMany({
                ...query.extractResolvedFilters(),
                include: { categories: true },
            }),
        ]);
        return { total, data };
    }

    async findOne(dto: ProductParamDTO): Promise<ProductDTO | null> {
        const { token, name } = dto;

        return this._context.product.findFirst({
            include: { categories: true },
            where: { OR: [token && { token }, name && { name }] },
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
