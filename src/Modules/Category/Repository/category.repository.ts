import { Injectable } from '@nestjs/common';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import { ProductDTO, ProductFilterDTO } from 'modules/Product/@namespace';
import {
    CategoryDTO,
    CategoryQueryDTO,
    CategoryParamDTO,
    CategoryCreateDTO,
    CategoryUpdateDTO,
} from 'modules/Category/@namespace';

@Injectable()
export class CategoryRepository {
    constructor(private readonly _context: PrismaService) {}

    async findProducts(
        query: ProductFilterDTO,
    ): Promise<{ total: number; data: ProductDTO[] }> {
        const token = query.token
            ? query.token
            : (await this.findOne({ name: query.name }))?.token;

        const [total, data] = await Promise.all([
            this._context.product.count({
                where: { OR: [token && { categoriesIDs: { has: token } }] },
            }),
            this._context.product.findMany({
                ...query.extractResolvedFilters(),
                include: { categories: true },
                where: { OR: [token && { categoriesIDs: { has: token } }] },
            }),
        ]);
        return { total, data };
    }

    async findMany(
        query: CategoryQueryDTO,
    ): Promise<{ total: number; data: CategoryDTO[] }> {
        const [total, data] = await Promise.all([
            this._context.category.count(),
            this._context.category.findMany({
                ...query.extractResolvedFilters(),
            }),
        ]);
        return { total, data };
    }

    async findOne(dto: CategoryParamDTO): Promise<CategoryDTO | null> {
        const { token, name } = dto;

        return this._context.category.findFirst({
            where: { OR: [token && { token }, name && { name }] },
        });
    }

    async register(dto: CategoryCreateDTO): Promise<CategoryDTO> {
        return this._context.category.create({ data: dto });
    }

    async update(token: string, dto: CategoryUpdateDTO): Promise<void> {
        await this._context.category.update({ where: { token }, data: dto });
    }

    async remove(token: string): Promise<void> {
        await this._context.category.delete({ where: { token } });
    }
}
