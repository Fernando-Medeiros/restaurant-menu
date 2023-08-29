import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import { CategoryRepository } from '../Repository/category.repository';
import { CategoryParamDTO } from '../DTOs/category.paramDTO';
import { CategoryQueryDTO } from '../DTOs/category.queryDTO';
import { CategoryCreateDTO } from '../DTOs/category.createDTO';
import { CategoryUpdateDTO } from '../DTOs/category.updateDTO';
import {
    MockCategory,
    MockCategoryResource,
    MockProduct,
    MockProductResource,
} from 'mocks/_mockData';
import { CategoryService } from '../category.service';
import NotFoundError from 'errors/NotFoundError';
import { CategoryController } from 'controllers/v1/category.controller';

describe('Unit - CategoryController', () => {
    let createDTO: CategoryCreateDTO;
    let updateDTO: CategoryUpdateDTO;
    let queryDTO: CategoryQueryDTO;
    let paramDTO: CategoryParamDTO;
    let categoryService: CategoryService;
    let categoryController: CategoryController;

    beforeEach(() => {
        createDTO = new CategoryCreateDTO();
        updateDTO = new CategoryUpdateDTO();
        queryDTO = new CategoryQueryDTO();
        paramDTO = new CategoryParamDTO();
        categoryService = new CategoryService(
            new CategoryRepository(new PrismaService()),
        );
        categoryController = new CategoryController(categoryService);
    });

    describe('Success', () => {
        describe('findProducts', () => {
            it('should return an array of products resources', async () => {
                const result = [MockProduct];
                const output = [MockProductResource];

                jest.spyOn(
                    categoryService,
                    'findProducts',
                ).mockResolvedValueOnce(result);

                expect(
                    await categoryController.findProducts(paramDTO),
                ).toStrictEqual(output);
            });
            it('should return an empty array', async () => {
                const result = [];
                const output = [];

                jest.spyOn(
                    categoryService,
                    'findProducts',
                ).mockResolvedValueOnce(result);

                expect(
                    await categoryController.findProducts(paramDTO),
                ).toStrictEqual(output);
            });
        });

        describe('findMany', () => {
            it('should return an array of categories resources', async () => {
                const result = [MockCategory];
                const output = [MockCategoryResource];

                jest.spyOn(categoryService, 'findMany').mockResolvedValueOnce(
                    result,
                );

                expect(
                    await categoryController.findMany(queryDTO),
                ).toStrictEqual(output);
            });
            it('should return an empty array', async () => {
                const result = [];
                const output = [];

                jest.spyOn(categoryService, 'findMany').mockResolvedValueOnce(
                    result,
                );

                expect(
                    await categoryController.findMany(queryDTO),
                ).toStrictEqual(output);
            });
        });

        describe('findOne', () => {
            it('should return a category resource', async () => {
                const result = MockCategory;
                const output = MockCategoryResource;

                jest.spyOn(categoryService, 'findOne').mockResolvedValueOnce(
                    result,
                );

                expect(
                    await categoryController.findOne(paramDTO),
                ).toStrictEqual(output);
            });
        });

        describe('register', () => {
            it('should register a category ', async () => {
                const result = undefined;
                const output = undefined;

                jest.spyOn(categoryService, 'register').mockResolvedValueOnce(
                    result,
                );

                expect(
                    await categoryController.register(createDTO),
                ).toStrictEqual(output);
            });
        });

        describe('update', () => {
            it('should update a category ', async () => {
                const result = undefined;
                const output = undefined;

                jest.spyOn(categoryService, 'update').mockResolvedValueOnce(
                    result,
                );

                expect(
                    await categoryController.update('token', updateDTO),
                ).toStrictEqual(output);
            });
        });

        describe('remove', () => {
            it('should remove a category ', async () => {
                const result = undefined;
                const output = undefined;

                jest.spyOn(categoryService, 'remove').mockResolvedValueOnce(
                    result,
                );

                expect(await categoryController.remove('token')).toStrictEqual(
                    output,
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
            it('should update a category ', async () => {
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
