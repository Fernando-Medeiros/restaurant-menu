import { Test } from '@nestjs/testing';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import { MenuController } from 'controllers/v1/@namespace';
import {
    MenuCreateDTO,
    MenuParamDTO,
    MenuQueryDTO,
    MenuRepository,
    MenuService,
    MenuUpdateDTO,
} from 'modules/Menu/@namespace';
import {
    CategoryRepository,
    CategoryService,
} from 'modules/Category/@namespace';
import { ProductRepository, ProductService } from 'modules/Product/@namespace';
import { PaginateMenu } from 'modulesHelpers/Pagination/@namespace';
import { MockMenu, MockMenuResource } from 'mocks/mockData';
import { NotFoundError } from 'exceptions/@namespace';

describe('Unit - MenuController', () => {
    const createDTO: MenuCreateDTO = { ...MockMenu };
    const updateDTO: MenuUpdateDTO = { ...MockMenu };
    const paramDTO: MenuParamDTO = { ...MockMenu };
    const queryDTO = new MenuQueryDTO();

    let menuService: MenuService;
    let menuController: MenuController;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [MenuController],
            providers: [
                PrismaService,
                MenuRepository,
                MenuService,
                ProductService,
                ProductRepository,
                CategoryService,
                CategoryRepository,
            ],
        }).compile();

        menuService = moduleRef.get<MenuService>(MenuService);
        menuController = moduleRef.get<MenuController>(MenuController);
    });

    describe('Success', () => {
        const request = { url: 'api/v1/menus' };

        describe('findMany', () => {
            it('should return an array of menus resources', async () => {
                const result = { total: 1, data: [MockMenu] };

                jest.spyOn(menuService, 'findMany').mockResolvedValueOnce(
                    result,
                );

                expect(
                    await menuController.findMany(request, queryDTO),
                ).toStrictEqual(
                    new PaginateMenu({
                        ...result,
                        ...request,
                        ...queryDTO,
                    }),
                );
            });

            it('should return an empty array', async () => {
                const result = { total: 0, data: [] };

                jest.spyOn(menuService, 'findMany').mockResolvedValueOnce(
                    result,
                );

                expect(
                    await menuController.findMany(request, queryDTO),
                ).toStrictEqual(
                    new PaginateMenu({
                        ...result,
                        ...request,
                        ...queryDTO,
                    }),
                );
            });
        });

        describe('findOne', () => {
            it('should return a menu resource', async () => {
                const result = MockMenu;
                const output = MockMenuResource;

                jest.spyOn(menuService, 'findOne').mockResolvedValueOnce(
                    result,
                );
                expect(await menuController.findOne(paramDTO)).toStrictEqual(
                    output,
                );
            });
        });

        describe('register', () => {
            const result = undefined;

            it('should register a menu ', async () => {
                jest.spyOn(menuService, 'register').mockResolvedValueOnce(
                    result,
                );
                expect(await menuController.register(createDTO)).toStrictEqual(
                    result,
                );
            });
        });

        describe('update', () => {
            const result = undefined;

            it('should update a menu ', async () => {
                jest.spyOn(menuService, 'update').mockResolvedValueOnce(result);
                expect(
                    await menuController.update('token', updateDTO),
                ).toStrictEqual(result);
            });
        });

        describe('remove', () => {
            const result = undefined;

            it('should remove a menu ', async () => {
                jest.spyOn(menuService, 'remove').mockResolvedValueOnce(result);
                expect(await menuController.remove('token')).toStrictEqual(
                    result,
                );
            });
        });
    });

    describe('Exception', () => {
        describe('findOne', () => {
            it('should return a NotFound if menu not exists', async () => {
                jest.spyOn(menuService, 'findOne').mockRejectedValue(
                    new NotFoundError(),
                );
                await expect(
                    menuController.findOne({ token: '111' }),
                ).rejects.toThrow(NotFoundError);
            });
        });

        describe('update', () => {
            it('should return a NotFound if menu not exists ', async () => {
                jest.spyOn(menuService, 'update').mockRejectedValue(
                    new NotFoundError(),
                );
                await expect(
                    menuController.update('111', updateDTO),
                ).rejects.toThrow(NotFoundError);
            });
        });

        describe('remove', () => {
            it('should return a NotFound if menu not exists', async () => {
                jest.spyOn(menuService, 'remove').mockRejectedValue(
                    new NotFoundError(),
                );

                await expect(menuController.remove('111')).rejects.toThrow(
                    NotFoundError,
                );
            });
        });
    });
});
