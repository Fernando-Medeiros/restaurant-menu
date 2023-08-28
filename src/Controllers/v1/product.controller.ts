import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotImplementedException,
    Patch,
    Post,
    Param,
    Query,
} from '@nestjs/common';
import { ProductCreateDTO } from 'src/Modules/Product/DTOs/product.createDTO';
import { ProductParamDTO } from 'src/Modules/Product/DTOs/product.paramDTO';
import { ProductQueryDTO } from 'src/Modules/Product/DTOs/product.queryDTO';
import { ProductUpdateDTO } from 'src/Modules/Product/DTOs/product.updateDTO';
import { ProductService } from 'src/Modules/Product/product.service';

@Controller('products')
export class ProductController {
    constructor(private readonly _service: ProductService) {}

    @Get('find')
    async findMany(@Query() query: ProductQueryDTO) {
        throw new NotImplementedException('');
    }

    @Get()
    async findOne(@Param() param: ProductParamDTO) {
        throw new NotImplementedException('');
    }

    @Post()
    @HttpCode(201)
    async register(@Body() body: ProductCreateDTO) {
        throw new NotImplementedException('');
    }

    @Patch()
    @HttpCode(204)
    async update(
        @Param('token') token: string,
        @Body() body: ProductUpdateDTO,
    ) {
        throw new NotImplementedException('');
    }

    @Delete()
    @HttpCode(204)
    async remove(@Param('token') token: string) {
        throw new NotImplementedException('');
    }
}
