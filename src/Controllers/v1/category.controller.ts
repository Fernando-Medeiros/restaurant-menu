import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotImplementedException,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { CategoryParamDTO } from 'src/Modules/Category/DTOs/category.paramDTO';
import { CategoryQueryDTO } from 'src/Modules/Category/DTOs/category.queryDTO';
import { CategoryUpdateRequest } from 'src/Modules/Category/Requests/category.updateRequest';
import { CategoryService } from 'src/Modules/Category/category.service';
import { CategoryCreateRequest } from 'src/Modules/Product/Requests/product.createRequest';

@Controller('categories')
export class CategoryController {
    constructor(private readonly _service: CategoryService) {}

    @Get('products')
    async findProducts(@Param() param: CategoryParamDTO) {
        throw new NotImplementedException('');
    }

    @Get('find')
    async findMany(@Query() query: CategoryQueryDTO) {
        throw new NotImplementedException('');
    }

    @Get()
    async findOne(@Param() param: CategoryParamDTO) {
        throw new NotImplementedException('');
    }

    @Post()
    @HttpCode(201)
    async register(@Body() body: CategoryCreateRequest) {
        throw new NotImplementedException('');
    }

    @Patch()
    @HttpCode(204)
    async update(
        @Param('token') token: string,
        @Body() body: CategoryUpdateRequest,
    ) {
        throw new NotImplementedException('');
    }

    @Delete()
    @HttpCode(204)
    async remove(@Param('token') token: string) {
        throw new NotImplementedException('');
    }
}
