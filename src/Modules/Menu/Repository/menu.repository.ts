import { Injectable } from '@nestjs/common';
import { Period } from '@prisma/client';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import {
    MenuDTO,
    MenuParamDTO,
    MenuQueryDTO,
    MenuCreateDTO,
    MenuUpdateDTO,
} from 'modules/Menu/@namespace';

@Injectable()
export class MenuRepository {
    constructor(private readonly _context: PrismaService) {}

    async findManyByCurrentPeriod(
        query: MenuQueryDTO,
    ): Promise<{ total: number; data: MenuDTO[] }> {
        const period: Period = this.resolvePeriod();

        const [total, data] = await Promise.all([
            this._context.menu.count({ where: { period } }),
            this._context.menu.findMany({
                ...query.extractResolvedFilters(),
                where: { period },
                include: { product: { include: { categories: true } } },
            }),
        ]);
        return { total, data };
    }

    async findMany(
        query: MenuQueryDTO,
    ): Promise<{ total: number; data: MenuDTO[] }> {
        const [total, data] = await Promise.all([
            this._context.menu.count(),
            this._context.menu.findMany({
                ...query.extractResolvedFilters(),
                include: { product: { include: { categories: true } } },
            }),
        ]);
        return { total, data };
    }

    async findOne(dto: MenuParamDTO): Promise<MenuDTO | null> {
        const { token, productToken } = dto;

        return this._context.menu.findFirst({
            where: {
                OR: [token && { token }, productToken && { productToken }],
            },
            include: { product: { include: { categories: true } } },
        });
    }

    async register(dto: MenuCreateDTO): Promise<MenuDTO> {
        return this._context.menu.create({
            data: dto,
            include: { product: true },
        });
    }

    async update(token: string, dto: MenuUpdateDTO): Promise<void> {
        await this._context.menu.update({ where: { token }, data: dto });
    }

    async remove(token: string): Promise<void> {
        await this._context.menu.delete({ where: { token } });
    }

    private resolvePeriod(): Period {
        const hour = new Date(
            new Date().toLocaleString('en-US', {
                timeZone: 'America/Sao_Paulo',
            }),
        ).getHours();

        return hour >= 6 && hour < 18 ? Period.daytime : Period.nighttime;
    }
}
