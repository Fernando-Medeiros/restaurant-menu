import { Module } from '@nestjs/common';
import { MenuModule } from 'modules/Menu/menu.module';
import { ProductModule } from 'modules/Product/product.module';
import { CategoryModule } from 'modules/Category/category.module';

@Module({
    imports: [MenuModule, ProductModule, CategoryModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
