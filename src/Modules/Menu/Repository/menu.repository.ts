import { Injectable } from '@nestjs/common';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import {
    MenuCreateDTO,
    MenuDTO,
    MenuParamDTO,
    MenuQueryDTO,
    MenuUpdateDTO,
} from 'modules/Menu/@namespace';

@Injectable()
export class MenuRepository {
    constructor(private readonly _context: PrismaService) {}

    async findMany(query: MenuQueryDTO): Promise<MenuDTO[] | []> {
        const { order, sort } = query;

        const orderBy = {
            token: { token: order },
            period: { period: order },
            productToken: { productToken: order },
            createdAt: { createdAt: order },
        }[sort];

        return this._context.menu.findMany({
            take: Math.abs(+query.take),
            skip: Math.abs(+query.skip),
            orderBy,
            include: { product: { include: { categories: true } } },
        });
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

    async register(dto: MenuCreateDTO): Promise<void> {
        await this._context.menu.create({ data: dto });
    }

    async update(token: string, dto: MenuUpdateDTO): Promise<void> {
        await this._context.menu.update({ where: { token }, data: dto });
    }

    async remove(token: string): Promise<void> {
        await this._context.menu.delete({ where: { token } });
    }
}
