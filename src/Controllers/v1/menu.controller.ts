import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
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
    MenuService,
    MenuResource,
    MenuParamDTO,
    MenuQueryDTO,
    MenuCreateDTO,
    MenuUpdateDTO,
} from 'modules/Menu/@namespace';
import { PaginateMenu } from 'modulesHelpers/Pagination/@namespace';

@ApiTags('Menu Controller')
@Controller('api/v1/menus')
export class MenuController {
    constructor(private readonly _service: MenuService) {}

    @Get('period')
    @ApiOperation({ summary: 'get records from menu in current period' })
    @ApiOkResponse({ type: PaginateMenu })
    async findManyByCurrentPeriod(
        @Request() request: object,
        @Query() query: MenuQueryDTO,
    ) {
        const menus = await this._service.findManyByCurrentPeriod(query);

        return new PaginateMenu({
            ...menus,
            ...request,
            ...query,
        });
    }

    @Get('find-many')
    @ApiOperation({ summary: 'get many records from the menu' })
    @ApiOkResponse({ type: MenuResource })
    async findMany(@Request() request: object, @Query() query: MenuQueryDTO) {
        const menus = await this._service.findMany(query);

        return new PaginateMenu({
            ...menus,
            ...request,
            ...query,
        });
    }

    @Get('find-one')
    @ApiOperation({ summary: 'get a record from the menu' })
    @ApiOkResponse({ type: MenuResource })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    async findOne(@Query() query: MenuParamDTO) {
        const menu = await this._service.findOne(query);

        return new MenuResource(menu);
    }

    @Post()
    @ApiOperation({ summary: 'register a product in the menu' })
    @ApiCreatedResponse({ description: 'success', type: MenuResource })
    @ApiBadRequestResponse({ description: 'bad request' })
    @HttpCode(201)
    async register(@Body() dto: MenuCreateDTO) {
        const menu = await this._service.register(dto);

        return new MenuResource(menu);
    }

    @Put(':token')
    @ApiOperation({ summary: 'update a a product in the menu' })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    @ApiNoContentResponse({ description: 'success' })
    @HttpCode(204)
    async update(@Param('token') token: string, @Body() dto: MenuUpdateDTO) {
        await this._service.update(token, dto);
    }

    @Delete(':token')
    @ApiOperation({ summary: 'remove a record from the menu' })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    @ApiNoContentResponse({ description: 'success' })
    @HttpCode(204)
    async remove(@Param('token') token: string) {
        await this._service.remove(token);
    }
}
