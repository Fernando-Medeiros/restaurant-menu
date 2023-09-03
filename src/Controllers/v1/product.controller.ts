import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Patch,
    Post,
    Param,
    Request,
    Query,
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
    ProductService,
    ProductResource,
    ProductQueryDTO,
    ProductParamDTO,
    ProductCreateDTO,
    ProductUpdateDTO,
} from 'modules/Product/@namespace';
import { PaginateProduct } from 'modulesHelpers/Pagination/@namespace';

@ApiTags('Product Controller')
@Controller('api/v1/products')
export class ProductController {
    constructor(private readonly _service: ProductService) {}

    @Get('find-many')
    @ApiOperation({ summary: 'get products' })
    @ApiOkResponse({ type: PaginateProduct })
    async findMany(
        @Request() request: object,
        @Query() query: ProductQueryDTO,
    ) {
        const products = await this._service.findMany(query);

        return new PaginateProduct({
            ...products,
            ...request,
            ...query,
        });
    }

    @Get('find-one')
    @ApiOperation({ summary: 'get a product' })
    @ApiOkResponse({ type: ProductResource })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    async findOne(@Query() query: ProductParamDTO) {
        const product = await this._service.findOne(query);

        return new ProductResource(product);
    }

    @Post()
    @ApiOperation({ summary: 'register a product' })
    @ApiCreatedResponse({ description: 'success' })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    @HttpCode(201)
    async register(@Body() dto: ProductCreateDTO) {
        await this._service.register(dto);
    }

    @Patch(':token')
    @ApiOperation({ summary: 'update a product' })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    @ApiNoContentResponse({ description: 'success' })
    @HttpCode(204)
    async update(@Param('token') token: string, @Body() dto: ProductUpdateDTO) {
        await this._service.update(token, dto);
    }

    @Delete(':token')
    @ApiOperation({ summary: 'remove a product' })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    @ApiNoContentResponse({ description: 'success' })
    @HttpCode(204)
    async remove(@Param('token') token: string) {
        await this._service.remove(token);
    }
}
