import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

import {
    CategoryCreateDTO,
    CategoryParamDTO,
    CategoryQueryDTO,
    CategoryResource,
    CategoryService,
    CategoryUpdateDTO,
} from 'modules/Category/@namespace';
import { ProductResource } from 'modules/Product/@namespace';

@ApiTags('Category Controller')
@Controller('api/v1/categories')
export class CategoryController {
    constructor(private readonly _service: CategoryService) {}

    @Get('products')
    @ApiOperation({ summary: 'get products by category' })
    @ApiOkResponse({ isArray: true, type: ProductResource })
    async findProducts(@Query() query: CategoryParamDTO) {
        const products = await this._service.findProducts(query);

        return ProductResource.toArray(products);
    }

    @Get('find-many')
    @ApiOperation({ summary: 'get categories' })
    @ApiOkResponse({ isArray: true, type: CategoryResource })
    async findMany(@Query() query: CategoryQueryDTO) {
        const categories = await this._service.findMany(query);

        return CategoryResource.toArray(categories);
    }

    @Get('find-one')
    @ApiOperation({ summary: 'get a category' })
    @ApiOkResponse({ type: CategoryResource })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    async findOne(@Query() query: CategoryParamDTO) {
        const category = await this._service.findOne(query);

        const resource = new CategoryResource(category);

        return resource;
    }

    @Post()
    @ApiOperation({ summary: 'register a category' })
    @ApiCreatedResponse({ description: 'success' })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    @HttpCode(201)
    async register(@Body() dto: CategoryCreateDTO) {
        await this._service.register(dto);
    }

    @Patch(':token')
    @ApiOperation({ summary: 'update a category' })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    @ApiNoContentResponse({ description: 'success' })
    @HttpCode(204)
    async update(
        @Param('token') token: string,
        @Body() dto: CategoryUpdateDTO,
    ) {
        await this._service.update(token, dto);
    }

    @Delete(':token')
    @ApiOperation({ summary: 'remove a category' })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    @ApiNoContentResponse({ description: 'success' })
    @HttpCode(204)
    async remove(@Param('token') token: string) {
        await this._service.remove(token);
    }
}
