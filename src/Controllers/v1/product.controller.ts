import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Patch,
    Post,
    Param,
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
    ProductCreateDTO,
    ProductParamDTO,
    ProductQueryDTO,
    ProductResource,
    ProductService,
    ProductUpdateDTO,
} from 'modules/Product/@namespace';

@ApiTags('Product Controller')
@Controller('api/v1/products')
export class ProductController {
    constructor(private readonly _service: ProductService) {}

    @Get('find-many')
    @ApiOperation({ summary: 'get products' })
    @ApiOkResponse({ isArray: true, type: ProductResource })
    async findMany(@Query() query: ProductQueryDTO) {
        const product = await this._service.findMany(query);

        return ProductResource.toArray(product);
    }

    @Get('find-one')
    @ApiOperation({ summary: 'get a product' })
    @ApiOkResponse({ type: ProductResource })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    async findOne(@Query() query: ProductParamDTO) {
        const product = await this._service.findOne(query);

        const resource = new ProductResource(product);

        return resource;
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
