import { ProductModule } from './Modules/Product/product.module';
import { CategoryModule } from './Modules/Category/category.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [ProductModule, CategoryModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
