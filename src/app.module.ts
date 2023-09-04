import { Module } from '@nestjs/common';
import { MenuModule } from 'modules/Menu/menu.module';
import { ProductModule } from 'modules/Product/product.module';
import { CategoryModule } from 'modules/Category/category.module';
import { RateLimiterModule } from 'config/Middleware/rate-limiter';

@Module({
    imports: [RateLimiterModule, MenuModule, ProductModule, CategoryModule],
})
export class AppModule {}
