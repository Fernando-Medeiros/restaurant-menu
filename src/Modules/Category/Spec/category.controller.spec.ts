import { Test } from '@nestjs/testing';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import { CategoryController } from 'controllers/v1/@namespace';
import { NotFoundError } from 'exceptions/@namespace';
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
import { ProductFilterDTO } from 'modules/Product/@namespace';
import {
    PaginateCategory,
    PaginateProduct,
} from 'modulesHelpers/Pagination/@namespace';

describe('Unit - CategoryController', () => {
    const createDTO: CategoryCreateDTO = { ...MockCategory };
    const updateDTO: CategoryUpdateDTO = { ...MockCategory };
    const paramDTO: CategoryParamDTO = { ...MockCategory };
    const filterDTO = new ProductFilterDTO();
    const queryDTO = new CategoryQueryDTO();

    let categoryService: CategoryService;
    let categoryController: CategoryController;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [CategoryController],
            providers: [PrismaService, CategoryRepository, CategoryService],
        }).compile();

        categoryService = moduleRef.get<CategoryService>(CategoryService);
        categoryController =
            moduleRef.get<CategoryController>(CategoryController);
    });

    describe('Success', () => {
        const request = { url: 'api/v1/' };

        describe('findProducts', () => {
            it('should return an pagination of products resources', async () => {
                const result = { total: 1, data: [MockProduct] };

                jest.spyOn(
                    categoryService,
                    'findProducts',
                ).mockResolvedValueOnce(result);

                expect(
                    await categoryController.findProducts(request, filterDTO),
                ).toStrictEqual(
                    new PaginateProduct({
                        ...result,
                        ...request,
                        ...filterDTO,
                    }),
                );
            });

            it('should return an empty pagination', async () => {
                const result = { total: 0, data: [] };

                jest.spyOn(
                    categoryService,
                    'findProducts',
                ).mockResolvedValueOnce(result);

                expect(
                    await categoryController.findProducts(request, filterDTO),
                ).toStrictEqual(
                    new PaginateProduct({
                        ...result,
                        ...request,
                        ...filterDTO,
                    }),
                );
            });
        });

        describe('findMany', () => {
            it('should return an pagination of categories resources', async () => {
                const result = { total: 1, data: [MockCategory] };

                jest.spyOn(categoryService, 'findMany').mockResolvedValueOnce(
                    result,
                );
                expect(
                    await categoryController.findMany(request, queryDTO),
                ).toStrictEqual(
                    new PaginateCategory({
                        ...result,
                        ...request,
                        ...queryDTO,
                    }),
                );
            });

            it('should return an empty pagination', async () => {
                const result = { total: 0, data: [] };

                jest.spyOn(categoryService, 'findMany').mockResolvedValueOnce(
                    result,
                );

                expect(
                    await categoryController.findMany(request, queryDTO),
                ).toStrictEqual(
                    new PaginateCategory({
                        ...result,
                        ...request,
                        ...queryDTO,
                    }),
                );
            });

            describe('findOne', () => {
                const result = MockCategory;
                const output = MockCategoryResource;

                it('should return a category resource', async () => {
                    jest.spyOn(
                        categoryService,
                        'findOne',
                    ).mockResolvedValueOnce(result);

                    expect(
                        await categoryController.findOne(paramDTO),
                    ).toStrictEqual(output);
                });
            });

            describe('register', () => {
                const result = undefined;

                it('should register a category ', async () => {
                    jest.spyOn(
                        categoryService,
                        'register',
                    ).mockResolvedValueOnce(result);

                    expect(
                        await categoryController.register(createDTO),
                    ).toStrictEqual(result);
                });
            });

            describe('update', () => {
                const result = undefined;

                it('should update a category ', async () => {
                    jest.spyOn(categoryService, 'update').mockResolvedValueOnce(
                        result,
                    );

                    expect(
                        await categoryController.update('token', updateDTO),
                    ).toStrictEqual(result);
                });
            });

            describe('remove', () => {
                const result = undefined;

                it('should remove a category ', async () => {
                    jest.spyOn(categoryService, 'remove').mockResolvedValueOnce(
                        result,
                    );

                    expect(
                        await categoryController.remove('token'),
                    ).toStrictEqual(result);
                });
            });
        });

        describe('Exception', () => {
            describe('findOne', () => {
                it('should return a NotFound if category not exists', async () => {
                    jest.spyOn(categoryService, 'findOne').mockRejectedValue(
                        new NotFoundError(),
                    );

                    await expect(
                        categoryController.findOne({ name: '111' }),
                    ).rejects.toThrow(NotFoundError);
                });
            });

            describe('update', () => {
                it('should return a NotFound if category not exists ', async () => {
                    jest.spyOn(categoryService, 'update').mockRejectedValue(
                        new NotFoundError(),
                    );
                    await expect(
                        categoryController.update('111', updateDTO),
                    ).rejects.toThrow(NotFoundError);
                });
            });

            describe('remove', () => {
                it('should return a NotFound if category not exists', async () => {
                    jest.spyOn(categoryService, 'remove').mockRejectedValue(
                        new NotFoundError(),
                    );
                    await expect(
                        categoryController.remove('111'),
                    ).rejects.toThrow(NotFoundError);
                });
            });
        });
    });
});
