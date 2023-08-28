import { Injectable } from '@nestjs/common';
import { CategoryUpdateDTO } from '../DTOs/category.updateDTO';
import { CategoryCreateDTO } from '../DTOs/category.createDTO';
import { CategoryParamDTO } from '../DTOs/category.paramDTO';
import { CategoryQueryDTO } from '../DTOs/category.queryDTO';
import { CategoryDTO } from '../DTOs/categoryDTO';
import { ProductDTO } from 'modules/Product/DTOs/productDTO';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';

@Injectable()
export class CategoryRepository {
    constructor(private readonly _context: PrismaService) {}

    async findProducts(dto: CategoryParamDTO): Promise<ProductDTO[] | []> {
        const { token, name } = dto;

        const query = {
            ...(token && { token }),
            ...(name && { name }),
        };

        return this._context.product.findMany({
            where: { categories: { some: { ...query } } },
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
            take: +query.take,
            skip: +query.skip,
            orderBy: orderBy[sort],
        });
    }

    async findOne(dto: CategoryParamDTO): Promise<CategoryDTO | null> {
        const { token, name } = dto;

        const query = {
            ...(token && { token }),
            ...(name && { name }),
        };
        return this._context.category.findFirst({ where: query });
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
