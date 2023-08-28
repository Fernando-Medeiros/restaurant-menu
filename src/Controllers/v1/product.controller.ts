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
import { ProductCreateRequest } from 'src/Modules/Category/Requests/category.createRequest';
import { ProductParamDTO } from 'src/Modules/Product/DTOs/product.paramDTO';
import { ProductQueryDTO } from 'src/Modules/Product/DTOs/product.queryDTO';
import { ProductUpdateRequest } from 'src/Modules/Product/Requests/product.updateRequest';
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
    async register(@Body() body: ProductCreateRequest) {
        throw new NotImplementedException('');
    }

    @Patch()
    @HttpCode(204)
    async update(
        @Param('token') token: string,
        @Body() body: ProductUpdateRequest,
    ) {
        throw new NotImplementedException('');
    }

    @Delete()
    @HttpCode(204)
    async remove(@Param('token') token: string) {
        throw new NotImplementedException('');
    }
}
