import { Module } from '@nestjs/common';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import { MenuController } from 'controllers/v1/@namespace';
import { MenuRepository, MenuService } from './@namespace';
import { ProductRepository, ProductService } from 'modules/Product/@namespace';
import {
    CategoryRepository,
    CategoryService,
} from 'modules/Category/@namespace';

@Module({
    imports: [],
    controllers: [MenuController],
    providers: [
        PrismaService,
        MenuService,
        MenuRepository,
        ProductService,
        ProductRepository,
        CategoryService,
        CategoryRepository,
    ],
})
export class MenuModule {}
