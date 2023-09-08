import { Test } from '@nestjs/testing';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import { CategoryController } from 'controllers/v1/@namespace';
import { BadRequestError, NotFoundError } from 'exceptions/@namespace';
import {
    CategoryCreateDTO,
    CategoryParamDTO,
    CategoryQueryDTO,
    CategoryRepository,
    CategoryService,
    CategoryUpdateDTO,
} from 'modules/Category/@namespace';
import {
    MockCategory,
    MockCategoryResource,
    MockProduct,
} from 'mocks/mockData';
import {
    PaginateCategory,
    PaginateProduct,
} from 'modulesHelpers/Pagination/@namespace';
import { ProductFilterDTO } from 'modules/Product/@namespace';

describe('Unit - CategoryController', () => {
    const createInput: CategoryCreateDTO = { ...MockCategory };
    const updateInput: CategoryUpdateDTO = { ...MockCategory };
    const paramInput: CategoryParamDTO = { ...MockCategory };
    const queryInput = new CategoryQueryDTO();
    const filterInput = new ProductFilterDTO();
    const requestInput = { url: 'api/v1/' };

    let controller: CategoryController;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [CategoryController],
            providers: [PrismaService, CategoryRepository, CategoryService],
        }).compile();

        controller = moduleRef.get<CategoryController>(CategoryController);
    });

    describe('Success', () => {
        describe('findProducts', () => {
            it('should return an pagination of products resources', async () => {
                const output = new PaginateProduct({
                    ...{ total: 2, data: [MockProduct, MockProduct] },
                    ...requestInput,
                    ...filterInput,
                });

                const spy = jest
                    .spyOn(controller, 'findProducts')
                    .mockResolvedValueOnce(output);

                expect(
                    await controller.findProducts(requestInput, filterInput),
                ).toStrictEqual(output);

                expect(spy).toHaveBeenCalledWith(requestInput, filterInput);
            });

            it('should return an empty pagination', async () => {
                const output = new PaginateProduct({
                    ...{ total: 0, data: [] },
                    ...requestInput,
                    ...filterInput,
                });

                const spy = jest
                    .spyOn(controller, 'findProducts')
                    .mockResolvedValueOnce(output);

                expect(
                    await controller.findProducts(requestInput, filterInput),
                ).toStrictEqual(output);

                expect(spy).toHaveBeenCalledWith(requestInput, filterInput);
            });
        });

        describe('findMany', () => {
            it('should return an pagination of categories resources', async () => {
                const output = new PaginateCategory({
                    ...{ total: 1, data: [MockCategory] },
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

            it('should return an empty pagination', async () => {
                const output = new PaginateCategory({
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

            describe('findOne', () => {
                it('should return a category resource', async () => {
                    const output = MockCategoryResource;

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
                it('should register a category ', async () => {
                    const output = MockCategoryResource;

                    const spy = jest
                        .spyOn(controller, 'register')
                        .mockResolvedValueOnce(output);

                    expect(
                        await controller.register(createInput),
                    ).toStrictEqual(output);

                    expect(spy).toHaveBeenCalledWith(createInput);
                });
            });

            describe('update', () => {
                it('should update a category ', async () => {
                    const output = undefined;

                    const spy = jest
                        .spyOn(controller, 'update')
                        .mockResolvedValueOnce(output);

                    expect(
                        await controller.update(
                            MockCategory.token,
                            updateInput,
                        ),
                    ).toStrictEqual(output);

                    expect(spy).toHaveBeenCalledWith(
                        MockCategory.token,
                        updateInput,
                    );
                });
            });

            describe('remove', () => {
                it('should remove a category ', async () => {
                    const output = undefined;

                    const spy = jest
                        .spyOn(controller, 'remove')
                        .mockResolvedValueOnce(output);

                    expect(
                        await controller.remove(MockCategory.token),
                    ).toStrictEqual(output);

                    expect(spy).toHaveBeenCalledWith(MockCategory.token);
                });
            });
        });

        describe('Exception', () => {
            describe('findOne', () => {
                it('should return a NotFound if category not exists', async () => {
                    const output = NotFoundError;

                    const spy = jest
                        .spyOn(controller, 'findOne')
                        .mockRejectedValueOnce(new output());

                    await expect(
                        controller.findOne({ ...MockCategory }),
                    ).rejects.toThrow(output);

                    expect(spy).toHaveBeenCalledWith({ ...MockCategory });
                });
            });

            describe('update', () => {
                it('should return a NotFound if category not exists ', async () => {
                    const output = NotFoundError;

                    const spy = jest
                        .spyOn(controller, 'update')
                        .mockRejectedValueOnce(new output());

                    await expect(
                        controller.update(MockCategory.token, updateInput),
                    ).rejects.toThrow(output);

                    expect(spy).toHaveBeenCalledWith(
                        MockCategory.token,
                        updateInput,
                    );
                });

                it('should return a BadRequest if category name exists ', async () => {
                    const output = BadRequestError;

                    const spy = jest
                        .spyOn(controller, 'update')
                        .mockRejectedValueOnce(new output());

                    await expect(
                        controller.update(MockCategory.token, updateInput),
                    ).rejects.toThrow(output);

                    expect(spy).toHaveBeenCalledWith(
                        MockCategory.token,
                        updateInput,
                    );
                });
            });

            describe('remove', () => {
                it('should return a NotFound if category not exists', async () => {
                    const output = NotFoundError;

                    const spy = jest
                        .spyOn(controller, 'remove')
                        .mockRejectedValueOnce(new output());

                    await expect(
                        controller.remove(MockCategory.token),
                    ).rejects.toThrow(output);

                    expect(spy).toHaveBeenCalledWith(MockCategory.token);
                });
            });
        });
    });
});
