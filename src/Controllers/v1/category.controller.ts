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
import { ApiTags } from '@nestjs/swagger';
import { CategoryCreateDTO } from 'src/Modules/Category/DTOs/category.createDTO';
import { CategoryParamDTO } from 'src/Modules/Category/DTOs/category.paramDTO';
import { CategoryQueryDTO } from 'src/Modules/Category/DTOs/category.queryDTO';
import { CategoryUpdateDTO } from 'src/Modules/Category/DTOs/category.updateDTO';
import { CategoryService } from 'src/Modules/Category/category.service';

@ApiTags('Category Controller')
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
    async register(@Body() body: CategoryCreateDTO) {
        throw new NotImplementedException('');
    }

    @Patch()
    @HttpCode(204)
    async update(
        @Param('token') token: string,
        @Body() body: CategoryUpdateDTO,
    ) {
        throw new NotImplementedException('');
    }

    @Delete()
    @HttpCode(204)
    async remove(@Param('token') token: string) {
        throw new NotImplementedException('');
    }
}
