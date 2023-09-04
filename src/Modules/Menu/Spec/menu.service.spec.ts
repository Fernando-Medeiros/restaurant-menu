import { Test } from '@nestjs/testing';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import {
    MenuCreateDTO,
    MenuParamDTO,
    MenuQueryDTO,
    MenuRepository,
    MenuUpdateDTO,
    MenuService,
} from 'modules/Menu/@namespace';
import {
    CategoryRepository,
    CategoryService,
} from 'modules/Category/@namespace';
import { MockMenu, MockProduct } from 'mocks/mockData';
import { BadRequestError, NotFoundError } from 'exceptions/@namespace';
import { ProductService, ProductRepository } from 'modules/Product/@namespace';

describe('Unit - MenuService', () => {
    const createDTO: MenuCreateDTO = { ...MockMenu };
    const updateDTO: MenuUpdateDTO = { ...MockMenu };
    const paramDTO: MenuParamDTO = { ...MockMenu };
    const queryDTO = new MenuQueryDTO();

    let productService: ProductService;
    let menuRepository: MenuRepository;
    let menuService: MenuService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [],
            providers: [
                PrismaService,
                MenuService,
                MenuRepository,
                ProductService,
                ProductRepository,
                CategoryService,
                CategoryRepository,
            ],
        }).compile();

        productService = moduleRef.get<ProductService>(ProductService);
        menuRepository = moduleRef.get<MenuRepository>(MenuRepository);
        menuService = moduleRef.get<MenuService>(MenuService);
    });

    describe('Success', () => {
        describe('findMany', () => {
            it('should return an array of menus', async () => {
                const result = { total: 1, data: [MockMenu] };

                jest.spyOn(menuRepository, 'findMany').mockResolvedValueOnce(
                    result,
                );

                expect(await menuService.findMany(queryDTO)).toBe(result);
            });

            it('should return an empty array', async () => {
                const result = { total: 0, data: [] };

                jest.spyOn(menuRepository, 'findMany').mockResolvedValueOnce(
                    result,
                );
                expect(await menuService.findMany(queryDTO)).toStrictEqual(
                    result,
                );
            });
        });

        describe('findOne', () => {
            const result = MockMenu;

            it('should return a menu', async () => {
                jest.spyOn(menuRepository, 'findOne').mockResolvedValueOnce(
                    result,
                );
                expect(await menuService.findOne(paramDTO)).toBe(result);
            });
        });

        describe('register', () => {
            const result = undefined;

            it('should  register a menu', async () => {
                const spy = jest
                    .spyOn(menuService, 'register')
                    .mockResolvedValueOnce(result);

                expect(await menuService.register(createDTO)).toBe(result);
                expect(spy).toHaveBeenCalledWith(createDTO);
            });
        });

        describe('update', () => {
            const result = undefined;

            it('should  update a menu', async () => {
                jest.spyOn(menuService, 'findOne').mockResolvedValueOnce(
                    MockMenu,
                );
                jest.spyOn(productService, 'findOne').mockResolvedValueOnce(
                    MockProduct,
                );
                jest.spyOn(menuService, 'update').mockResolvedValueOnce(result);
                expect(
                    await menuService.update(MockMenu.token, { ...updateDTO }),
                ).toBe(result);
            });
        });

        describe('remove', () => {
            const result = undefined;

            it('should remove a menu', async () => {
                jest.spyOn(menuRepository, 'findOne').mockResolvedValueOnce(
                    MockMenu,
                );
                jest.spyOn(menuRepository, 'remove').mockResolvedValueOnce(
                    result,
                );
                expect(await menuService.remove(MockMenu.token)).toBe(result);
            });
        });
    });

    describe('Exception', () => {
        describe('findOne', () => {
            const result = undefined;

            it('should return NotFound if menu nothing exists', async () => {
                jest.spyOn(menuRepository, 'findOne').mockResolvedValueOnce(
                    result,
                );
                await expect(menuService.findOne(Object())).rejects.toThrow(
                    NotFoundError,
                );
            });
        });

        describe('register', () => {
            it('should return BadRequest if menu already exists', async () => {
                jest.spyOn(productService, 'findOne').mockResolvedValueOnce(
                    MockProduct,
                );

                jest.spyOn(menuRepository, 'findOne').mockRejectedValueOnce(
                    new BadRequestError(),
                );

                await expect(menuService.register(createDTO)).rejects.toThrow(
                    BadRequestError,
                );
            });
        });

        describe('update', () => {
            it('should return NotFound if menu nothing exists', async () => {
                jest.spyOn(menuRepository, 'findOne').mockResolvedValueOnce(
                    undefined,
                );

                await expect(
                    menuService.update('token', updateDTO),
                ).rejects.toThrow(NotFoundError);
            });

            it('should return BadRequest if menu already exists', async () => {
                jest.spyOn(menuService, 'findOne').mockResolvedValueOnce(
                    MockMenu,
                );
                jest.spyOn(productService, 'findOne').mockResolvedValueOnce(
                    MockProduct,
                );
                jest.spyOn(menuRepository, 'findOne').mockRejectedValueOnce(
                    new BadRequestError(),
                );
                await expect(
                    menuService.update(MockMenu.token, updateDTO),
                ).rejects.toThrow(BadRequestError);
            });
        });

        describe('remove', () => {
            it('should return NotFound if menu nothing exists', async () => {
                jest.spyOn(menuRepository, 'findOne').mockResolvedValueOnce(
                    undefined,
                );

                await expect(menuService.remove('token')).rejects.toThrow(
                    NotFoundError,
                );
            });
        });
    });
});
