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
    MockProductResource,
} from 'mocks/mockData';

describe('Unit - CategoryController', () => {
    const createDTO: CategoryCreateDTO = { ...MockCategory };
    const updateDTO: CategoryUpdateDTO = { ...MockCategory };
    const paramDTO: CategoryParamDTO = { ...MockCategory };
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
        describe('findProducts', () => {
            const result = [MockProduct];
            const output = [MockProductResource];

            it('should return an array of products resources', async () => {
                jest.spyOn(categoryService, 'findProducts').mockImplementation(
                    async () => result,
                );
                expect(
                    await categoryController.findProducts(paramDTO),
                ).toStrictEqual(output);
            });

            it('should return an empty array', async () => {
                jest.spyOn(categoryService, 'findProducts').mockImplementation(
                    async () => [],
                );
                expect(
                    await categoryController.findProducts(paramDTO),
                ).toStrictEqual([]);
            });
        });

        describe('findMany', () => {
            const result = [MockCategory];
            const output = [MockCategoryResource];

            it('should return an array of categories resources', async () => {
                jest.spyOn(categoryService, 'findMany').mockImplementation(
                    async () => result,
                );
                expect(
                    await categoryController.findMany(queryDTO),
                ).toStrictEqual(output);
            });

            it('should return an empty array', async () => {
                jest.spyOn(categoryService, 'findMany').mockImplementation(
                    async () => [],
                );
                expect(
                    await categoryController.findMany(queryDTO),
                ).toStrictEqual([]);
            });
        });

        describe('findOne', () => {
            const result = MockCategory;
            const output = MockCategoryResource;

            it('should return a category resource', async () => {
                jest.spyOn(categoryService, 'findOne').mockImplementation(
                    async () => result,
                );
                expect(
                    await categoryController.findOne(paramDTO),
                ).toStrictEqual(output);
            });
        });

        describe('register', () => {
            const result = undefined;

            it('should register a category ', async () => {
                jest.spyOn(categoryService, 'register').mockImplementation(
                    () => result,
                );
                expect(
                    await categoryController.register(createDTO),
                ).toStrictEqual(result);
            });
        });

        describe('update', () => {
            const result = undefined;

            it('should update a category ', async () => {
                jest.spyOn(categoryService, 'update').mockImplementation(
                    () => result,
                );
                expect(
                    await categoryController.update('token', updateDTO),
                ).toStrictEqual(result);
            });
        });

        describe('remove', () => {
            const result = undefined;

            it('should remove a category ', async () => {
                jest.spyOn(categoryService, 'remove').mockImplementation(
                    () => result,
                );
                expect(await categoryController.remove('token')).toStrictEqual(
                    result,
                );
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
                await expect(categoryController.remove('111')).rejects.toThrow(
                    NotFoundError,
                );
            });
        });
    });
});
