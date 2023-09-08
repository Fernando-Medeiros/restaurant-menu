import { Test } from '@nestjs/testing';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import { MenuController } from 'controllers/v1/@namespace';
import {
    MenuUpdateDTO,
    MenuCreateDTO,
    MenuParamDTO,
    MenuQueryDTO,
    MenuRepository,
    MenuService,
} from 'modules/Menu/@namespace';
import {
    CategoryRepository,
    CategoryService,
} from 'modules/Category/@namespace';
import { ProductRepository, ProductService } from 'modules/Product/@namespace';
import { PaginateMenu } from 'modulesHelpers/Pagination/@namespace';
import { MockMenu, MockMenuResource } from 'mocks/mockData';
import { BadRequestError, NotFoundError } from 'exceptions/@namespace';

describe('Unit - MenuController', () => {
    const createInput: MenuCreateDTO = { ...MockMenu };
    const updateInput: MenuUpdateDTO = { ...MockMenu };
    const paramInput: MenuParamDTO = { ...MockMenu };
    const queryInput = new MenuQueryDTO();
    const requestInput = { url: 'api/v1/menus' };

    let controller: MenuController;

    beforeAll(async () => {
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

        controller = moduleRef.get<MenuController>(MenuController);
    });

    describe('Success', () => {
        describe('findMany', () => {
            it('should return an paginate of menus resources', async () => {
                const output = new PaginateMenu({
                    ...{ total: 1, data: [MockMenu] },
                    ...requestInput,
                    ...queryInput,
                });

                const spy = jest
                    .spyOn(controller, 'findMany')
                    .mockResolvedValueOnce(output);

                expect(
                    await controller.findMany(requestInput, queryInput),
                ).toStrictEqual(output);

                expect(spy).toHaveBeenCalledWith(requestInput, queryInput);
            });

            it('should return an empty paginate', async () => {
                const output = new PaginateMenu({
                    ...{ total: 0, data: [] },
                    ...requestInput,
                    ...queryInput,
                });

                const spy = jest
                    .spyOn(controller, 'findMany')
                    .mockResolvedValueOnce(output);

                expect(
                    await controller.findMany(requestInput, queryInput),
                ).toStrictEqual(output);

                expect(spy).toHaveBeenCalledWith(requestInput, queryInput);
            });
        });

        describe('findOne', () => {
            it('should return a menu resource', async () => {
                const output = MockMenuResource;

                const spy = jest
                    .spyOn(controller, 'findOne')
                    .mockResolvedValueOnce(output);

                expect(await controller.findOne(paramInput)).toStrictEqual(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(paramInput);
            });
        });

        describe('register', () => {
            it('should register a menu ', async () => {
                const output = MockMenuResource;

                const spy = jest
                    .spyOn(controller, 'register')
                    .mockResolvedValueOnce(output);

                expect(await controller.register(createInput)).toStrictEqual(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(createInput);
            });
        });

        describe('update', () => {
            it('should update a menu ', async () => {
                const output = undefined;

                const spy = jest
                    .spyOn(controller, 'update')
                    .mockResolvedValueOnce(output);

                expect(
                    await controller.update(MockMenu.token, updateInput),
                ).toStrictEqual(output);

                expect(spy).toHaveBeenCalledWith(MockMenu.token, updateInput);
            });
        });

        describe('remove', () => {
            it('should remove a menu ', async () => {
                const output = undefined;

                const spy = jest
                    .spyOn(controller, 'remove')
                    .mockResolvedValueOnce(output);

                expect(await controller.remove(MockMenu.token)).toStrictEqual(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(MockMenu.token);
            });
        });
    });

    describe('Exception', () => {
        describe('findOne', () => {
            it('should return NotFound if menu not exists', async () => {
                const output = NotFoundError;

                const spy = jest
                    .spyOn(controller, 'findOne')
                    .mockRejectedValueOnce(new output());

                await expect(controller.findOne(paramInput)).rejects.toThrow(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(paramInput);
            });
        });

        describe('update', () => {
            it('should return NotFound if menu not exists ', async () => {
                const output = NotFoundError;

                const spy = jest
                    .spyOn(controller, 'update')
                    .mockRejectedValueOnce(new output());

                await expect(
                    controller.update(MockMenu.token, updateInput),
                ).rejects.toThrow(output);

                expect(spy).toHaveBeenCalledWith(MockMenu.token, updateInput);
            });

            it('should return BadRequest if the menu is registered', async () => {
                const output = BadRequestError;

                const spy = jest
                    .spyOn(controller, 'update')
                    .mockRejectedValueOnce(new output());

                await expect(
                    controller.update(MockMenu.token, updateInput),
                ).rejects.toThrow(output);

                expect(spy).toHaveBeenCalledWith(MockMenu.token, updateInput);
            });
        });

        describe('remove', () => {
            it('should return NotFound if menu not exists', async () => {
                const output = NotFoundError;

                const spy = jest
                    .spyOn(controller, 'remove')
                    .mockRejectedValueOnce(new output());

                await expect(controller.remove(MockMenu.token)).rejects.toThrow(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(MockMenu.token);
            });
        });
    });
});
