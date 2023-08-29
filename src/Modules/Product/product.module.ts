import { Module } from '@nestjs/common';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import { ProductController } from 'controllers/v1/@namespace';
import { ProductRepository, ProductService } from 'modules/Product/@namespace';

@Module({
    imports: [],
    controllers: [ProductController],
    providers: [PrismaService, ProductService, ProductRepository],
})
export class ProductModule {}
