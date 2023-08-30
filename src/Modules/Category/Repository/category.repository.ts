import { Injectable } from '@nestjs/common';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import { ProductDTO } from 'modules/Product/@namespace';
import {
    CategoryUpdateDTO,
    CategoryCreateDTO,
    CategoryParamDTO,
    CategoryQueryDTO,
    CategoryDTO,
} from 'modules/Category/@namespace';

@Injectable()
export class CategoryRepository {
    constructor(private readonly _context: PrismaService) {}

    async findProducts(dto: CategoryParamDTO): Promise<ProductDTO[] | []> {
        const { token, name } = dto;
        return this._context.product.findMany({
            where: {
                OR: [
                    token && { categoriesIDs: { has: token } },
                    name && { categories: { every: { name } } },
                ],
            },
            include: { categories: true },
        });
    }

    async findMany(query: CategoryQueryDTO): Promise<CategoryDTO[] | []> {
        const { order, sort } = query;

        const orderBy = {
            token: { token: order },
            name: { name: order },
            createdAt: { createdAt: order },
        };

        return this._context.category.findMany({
            take: Math.abs(+query.take),
            skip: Math.abs(+query.skip),
            orderBy: orderBy[sort],
        });
    }

    async findOne(dto: CategoryParamDTO): Promise<CategoryDTO | null> {
        const { token, name } = dto;
        return this._context.category.findFirst({
            where: { OR: [token && { token }, name && { name }] },
        });
    }

    async register(dto: CategoryCreateDTO): Promise<void> {
        await this._context.category.create({ data: dto });
    }

    async update(token: string, dto: CategoryUpdateDTO): Promise<void> {
        await this._context.category.update({ where: { token }, data: dto });
    }

    async remove(token: string): Promise<void> {
        await this._context.category.delete({ where: { token } });
    }
}
