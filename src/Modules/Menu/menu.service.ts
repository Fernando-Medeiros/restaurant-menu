import { Injectable } from '@nestjs/common';
import {
    MenuCreateDTO,
    MenuDTO,
    MenuParamDTO,
    MenuQueryDTO,
    MenuRepository,
    MenuUpdateDTO,
} from './@namespace';
import { BadRequestError, NotFoundError } from 'exceptions/@namespace';
import { ProductService } from 'modules/Product/@namespace';

@Injectable()
export class MenuService {
    constructor(
        private readonly _repository: MenuRepository,
        private readonly _productService: ProductService,
    ) {}

    async findManyByCurrentPeriod(query: MenuQueryDTO): Promise<{
        total: number;
        data: MenuDTO[];
    }> {
        return this._repository.findManyByCurrentPeriod(query);
    }

    async findMany(
        query: MenuQueryDTO,
    ): Promise<{ total: number; data: MenuDTO[] }> {
        return this._repository.findMany(query);
    }

    async findOne(dto: MenuParamDTO): Promise<MenuDTO | null> {
        const menu = await this._repository.findOne(dto);

        if (menu == null) throw new NotFoundError('Menu Not Found');
        return menu;
    }

    async register(dto: MenuCreateDTO): Promise<void> {
        await this._productService.findOne({ token: dto.productToken });

        await this.throwUniqueProductRegisteredByPeriod(dto);

        await this._repository.register(dto);
    }

    async update(token: string, dto: MenuUpdateDTO): Promise<void> {
        await this.findOne({ token });

        await this._productService.findOne({ token: dto.productToken });

        await this.throwUniqueProductRegisteredByPeriod(dto);

        await this._repository.update(token, dto);
    }

    async remove(token: string): Promise<void> {
        await this.findOne({ token });

        await this._repository.remove(token);
    }

    private async throwUniqueProductRegisteredByPeriod(
        dto: MenuParamDTO & { productToken: string; period: string },
    ): Promise<void> {
        const menu = await this._repository.findOne(dto);

        if (
            menu &&
            menu.period === dto.period &&
            menu.productToken === dto.productToken
        ) {
            throw new BadRequestError(
                `There is already a menu registered with that product token: ${dto.productToken} and period: ${dto.period}`,
            );
        }
    }
}
