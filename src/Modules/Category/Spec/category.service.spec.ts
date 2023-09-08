import { Test } from '@nestjs/testing';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import {
    CategoryUpdateDTO,
    CategoryCreateDTO,
    CategoryParamDTO,
    CategoryQueryDTO,
    CategoryRepository,
    CategoryService,
} from 'modules/Category/@namespace';
import { BadRequestError, NotFoundError } from 'exceptions/@namespace';
import { ProductFilterDTO } from 'modules/Product/@namespace';
import { MockCategory, MockProduct } from 'mocks/mockData';

describe('Unit - CategoryService', () => {
    const createInput: CategoryCreateDTO = { ...MockCategory };
    const updateInput: CategoryUpdateDTO = { ...MockCategory };
    const paramInput: CategoryParamDTO = { ...MockCategory };
    const queryInput = new CategoryQueryDTO();
    const filterInput = new ProductFilterDTO();

    let service: CategoryService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [],
            providers: [PrismaService, CategoryRepository, CategoryService],
        }).compile();

        service = moduleRef.get<CategoryService>(CategoryService);
    });

    describe('Success', () => {
        describe('findProducts', () => {
            it('should return an array of products', async () => {
                const output = {
                    total: 3,
                    data: [MockProduct, MockProduct, MockProduct],
                };

                const spy = jest
                    .spyOn(service, 'findProducts')
                    .mockResolvedValueOnce(output);

                expect(await service.findProducts(filterInput)).toStrictEqual(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(filterInput);
            });

            it('should return an empty array', async () => {
                const output = { total: 0, data: [] };

                const spy = jest
                    .spyOn(service, 'findProducts')
                    .mockResolvedValueOnce(output);

                expect(await service.findProducts(filterInput)).toStrictEqual(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(filterInput);
            });
        });

        describe('findMany', () => {
            it('should return an array of categories', async () => {
                const output = { total: 1, data: [MockCategory] };

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
            it('should return a category', async () => {
                const output = MockCategory;

                const spy = jest
                    .spyOn(service, 'findOne')
                    .mockResolvedValueOnce(output);

                expect(await service.findOne(paramInput)).toStrictEqual(output);

                expect(spy).toHaveBeenCalledWith(paramInput);
            });
        });

        describe('register', () => {
            it('should register a category', async () => {
                const output = MockCategory;

                const spy = jest
                    .spyOn(service, 'register')
                    .mockResolvedValueOnce(output);

                expect(await service.register(createInput)).toBe(output);

                expect(spy).toHaveBeenCalledWith(createInput);
            });
        });

        describe('update', () => {
            it('should update a category', async () => {
                const output = undefined;

                const spy = jest
                    .spyOn(service, 'update')
                    .mockResolvedValueOnce(output);

                expect(
                    await service.update(MockCategory.token, updateInput),
                ).toBe(output);

                expect(spy).toHaveBeenCalledWith(
                    MockCategory.token,
                    updateInput,
                );
            });
        });

        describe('remove', () => {
            it('should remove a category', async () => {
                const output = undefined;

                const spy = jest
                    .spyOn(service, 'remove')
                    .mockResolvedValueOnce(output);

                expect(await service.remove(MockCategory.token)).toBe(output);

                expect(spy).toHaveBeenCalledWith(MockCategory.token);
            });
        });
    });

    describe('Exception', () => {
        describe('findOne', () => {
            const output = NotFoundError;

            it('should return NotFound if category nothing exists', async () => {
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
            it('should return BadRequest if category name exists', async () => {
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
            it('should return NotFound if category nothing exists', async () => {
                const output = NotFoundError;

                const spy = jest
                    .spyOn(service, 'update')
                    .mockRejectedValueOnce(new output());

                await expect(
                    service.update(MockCategory.token, updateInput),
                ).rejects.toThrow(output);

                expect(spy).toHaveBeenCalledWith(
                    MockCategory.token,
                    updateInput,
                );
            });

            it('should return BadRequest if category name exists', async () => {
                const output = BadRequestError;

                const spy = jest
                    .spyOn(service, 'update')
                    .mockRejectedValueOnce(new output());

                await expect(
                    service.update(MockCategory.token, updateInput),
                ).rejects.toThrow(output);

                expect(spy).toHaveBeenCalledWith(
                    MockCategory.token,
                    updateInput,
                );
            });
        });

        describe('remove', () => {
            it('should return NotFound if category nothing exists', async () => {
                const output = NotFoundError;

                const spy = jest
                    .spyOn(service, 'remove')
                    .mockRejectedValueOnce(new output());

                await expect(
                    service.remove(MockCategory.token),
                ).rejects.toThrow(output);

                expect(spy).toHaveBeenCalledWith(MockCategory.token);
            });
        });
    });
});
