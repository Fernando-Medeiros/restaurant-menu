import { ProductController } from './../../Controllers/v1/product.controller';
import { ProductRepository } from './Repository/product.repository';
import { ProductService } from './product.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository],
})
export class ProductModule {}
