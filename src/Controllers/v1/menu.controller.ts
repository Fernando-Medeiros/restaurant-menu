import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
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
    MenuCreateDTO,
    MenuParamDTO,
    MenuQueryDTO,
    MenuResource,
    MenuService,
    MenuUpdateDTO,
} from 'modules/Menu/@namespace';

@ApiTags('Menu Controller')
@Controller('api/v1/menus')
export class MenuController {
    constructor(private readonly _service: MenuService) {}

    @Get('find-many')
    @ApiOperation({ summary: 'get many records from the menu' })
    @ApiOkResponse({ isArray: true, type: MenuResource })
    async findMany(@Query() query: MenuQueryDTO) {
        const menus = await this._service.findMany(query);
        return MenuResource.toArray(menus);
    }

    @Get('find-one')
    @ApiOperation({ summary: 'get a record from the menu' })
    @ApiOkResponse({ type: MenuResource })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    async findOne(@Query() query: MenuParamDTO) {
        const menu = await this._service.findOne(query);
        const resource = new MenuResource(menu);
        return resource;
    }

    @Post()
    @ApiOperation({ summary: 'register a product in the menu' })
    @ApiCreatedResponse({ description: 'success' })
    @ApiBadRequestResponse({ description: 'bad request' })
    @ApiNotFoundResponse({ description: 'not found' })
    @HttpCode(201)
    async register(@Body() dto: MenuCreateDTO) {
        await this._service.register(dto);
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
