import { CategoryController } from './../../Controllers/v1/category.controller';
import { CategoryRepository } from './Repository/category.repository';
import { CategoryService } from './category.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [CategoryController],
    providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
