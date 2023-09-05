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
import { MockMenu } from 'mocks/mockData';
import { BadRequestError, NotFoundError } from 'exceptions/@namespace';
import { ProductService, ProductRepository } from 'modules/Product/@namespace';

describe('Unit - MenuService', () => {
    const createInput: MenuCreateDTO = { ...MockMenu };
    const updateInput: MenuUpdateDTO = { ...MockMenu };
    const paramInput: MenuParamDTO = { ...MockMenu };
    const queryInput = new MenuQueryDTO();

    let service: MenuService;

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

        service = moduleRef.get<MenuService>(MenuService);
    });

    describe('Success', () => {
        describe('findMany', () => {
            it('should return an array of menus', async () => {
                const output = {
                    total: 3,
                    data: [MockMenu, MockMenu, MockMenu],
                };

                const spy = jest
                    .spyOn(service, 'findMany')
                    .mockResolvedValueOnce(output);

                expect(await service.findMany(queryInput)).toStrictEqual(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(queryInput);
            });

            it('should return an empty array', async () => {
                const output = { total: 0, data: [] };

                const spy = jest
                    .spyOn(service, 'findMany')
                    .mockResolvedValueOnce(output);

                expect(await service.findMany(queryInput)).toStrictEqual(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(queryInput);
            });
        });

        describe('findOne', () => {
            it('should return a menu', async () => {
                const output = MockMenu;

                const spy = jest
                    .spyOn(service, 'findOne')
                    .mockResolvedValueOnce(output);

                expect(await service.findOne(paramInput)).toStrictEqual(output);

                expect(spy).toHaveBeenCalledWith(paramInput);
            });
        });

        describe('register', () => {
            it('should  register a menu', async () => {
                const output = undefined;

                const spy = jest
                    .spyOn(service, 'register')
                    .mockResolvedValueOnce(output);

                expect(await service.register(createInput)).toStrictEqual(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(createInput);
            });
        });

        describe('update', () => {
            it('should  update a menu', async () => {
                const output = undefined;

                const spy = jest
                    .spyOn(service, 'update')
                    .mockResolvedValueOnce(output);

                expect(
                    await service.update(MockMenu.token, updateInput),
                ).toStrictEqual(output);

                expect(spy).toHaveBeenCalledWith(MockMenu.token, updateInput);
            });
        });

        describe('remove', () => {
            it('should remove a menu', async () => {
                const output = undefined;

                const spy = jest
                    .spyOn(service, 'remove')
                    .mockResolvedValueOnce(output);

                expect(await service.remove(MockMenu.token)).toStrictEqual(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(MockMenu.token);
            });
        });
    });

    describe('Exception', () => {
        describe('findOne', () => {
            it('should return NotFound if menu nothing exists', async () => {
                const output = NotFoundError;

                const spy = jest
                    .spyOn(service, 'findOne')
                    .mockRejectedValueOnce(new output());

                await expect(service.findOne(paramInput)).rejects.toThrow(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(paramInput);
            });
        });

        describe('register', () => {
            it('should return BadRequest if menu already registered', async () => {
                const output = BadRequestError;

                const spy = jest
                    .spyOn(service, 'register')
                    .mockRejectedValueOnce(new output());

                await expect(service.register(createInput)).rejects.toThrow(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(createInput);
            });
        });

        describe('update', () => {
            it('should return NotFound if menu nothing exists', async () => {
                const output = NotFoundError;

                const spy = jest
                    .spyOn(service, 'update')
                    .mockRejectedValueOnce(new output());

                await expect(
                    service.update(MockMenu.token, updateInput),
                ).rejects.toThrow(output);

                expect(spy).toHaveBeenCalledWith(MockMenu.token, updateInput);
            });

            it('should return BadRequest if menu already exists', async () => {
                const output = BadRequestError;

                const spy = jest
                    .spyOn(service, 'update')
                    .mockRejectedValueOnce(new output());

                await expect(
                    service.update(MockMenu.token, updateInput),
                ).rejects.toThrow(output);

                expect(spy).toHaveBeenCalledWith(MockMenu.token, updateInput);
            });
        });

        describe('remove', () => {
            it('should return NotFound if menu nothing exists', async () => {
                const output = NotFoundError;

                const spy = jest
                    .spyOn(service, 'remove')
                    .mockRejectedValueOnce(new output());

                await expect(service.remove(MockMenu.token)).rejects.toThrow(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(MockMenu.token);
            });
        });
    });
});
