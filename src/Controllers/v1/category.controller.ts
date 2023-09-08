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
    Request,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiOkResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiNoContentResponse,
    ApiBadRequestResponse,
} from '@nestjs/swagger';
import {
    CategoryService,
    CategoryResource,
    CategoryParamDTO,
    CategoryQueryDTO,
    CategoryCreateDTO,
    CategoryUpdateDTO,
} from 'modules/Category/@namespace';
import {
    PaginateProduct,
    PaginateCategory,
} from 'modulesHelpers/Pagination/@namespace';
import { ProductFilterDTO } from 'modules/Product/@namespace';

@ApiTags('Category Controller')
@Controller('api/v1/categories')
export class CategoryController {
    constructor(private readonly _service: CategoryService) {}

    @Get('products')
    @ApiOperation({ summary: 'get products by category' })
    @ApiOkResponse({ type: PaginateProduct })
    async findProducts(
        @Request() request: object,
        @Query() query: ProductFilterDTO,
    ) {
        const products = await this._service.findProducts(query);

        return new PaginateProduct({
            ...products,
            ...request,
            ...query,
        });
    }

    @Get('find-many')
    @ApiOperation({ summary: 'get categories' })
    @ApiOkResponse({ type: PaginateCategory })
    async findMany(
        @Request() request: object,
        @Query() query: CategoryQueryDTO,
    ) {
        const categories = await this._service.findMany(query);

        return new PaginateCategory({
            ...categories,
            ...request,
            ...query,
        });
    }

    @Get('find-one')
    @ApiOperation({ summary: 'get a category' })
    @ApiOkResponse({ type: CategoryResource })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    async findOne(@Query() query: CategoryParamDTO) {
        const category = await this._service.findOne(query);

        return new CategoryResource(category);
    }

    @Post()
    @ApiOperation({ summary: 'register a category' })
    @ApiCreatedResponse({ description: 'success', type: CategoryResource })
    @ApiBadRequestResponse({ description: 'bad request' })
    @HttpCode(201)
    async register(@Body() dto: CategoryCreateDTO) {
        const category = await this._service.register(dto);

        return new CategoryResource(category);
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
