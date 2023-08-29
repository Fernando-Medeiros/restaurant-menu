import { Module } from '@nestjs/common';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import { CategoryController } from 'controllers/v1/@namespace';
import {
    CategoryRepository,
    CategoryService,
} from 'modules/Category/@namespace';

@Module({
    imports: [],
    controllers: [CategoryController],
    providers: [PrismaService, CategoryService, CategoryRepository],
})
export class CategoryModule {}
