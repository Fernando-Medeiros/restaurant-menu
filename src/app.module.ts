import { ProductModule } from 'modules/Product/product.module';
import { CategoryModule } from 'modules/Category/category.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [ProductModule, CategoryModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
