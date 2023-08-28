import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import { CategoryRepository } from '../Repository/category.repository';
import { CategoryParamDTO } from '../DTOs/category.paramDTO';
import { CategoryQueryDTO } from '../DTOs/category.queryDTO';
import { CategoryCreateDTO } from '../DTOs/category.createDTO';
import { CategoryUpdateDTO } from '../DTOs/category.updateDTO';
import { MockCategory, MockProduct } from 'mocks/_mockData';
import { CategoryService } from '../category.service';
import NotFoundError from 'errors/NotFoundError';

describe('Unit - CategoryService', () => {
    let createDTO: CategoryCreateDTO;
    let updateDTO: CategoryUpdateDTO;
    let queryDTO: CategoryQueryDTO;
    let paramDTO: CategoryParamDTO;
    let categoryService: CategoryService;
    let categoryRepository: CategoryRepository;

    beforeEach(() => {
        createDTO = new CategoryCreateDTO();
        updateDTO = new CategoryUpdateDTO();
        queryDTO = new CategoryQueryDTO();
        paramDTO = new CategoryParamDTO();
        categoryRepository = new CategoryRepository(new PrismaService());
        categoryService = new CategoryService(categoryRepository);
    });

    describe('Success', () => {
        describe('findProducts', () => {
            it('should return an array of products', async () => {
                const result = [MockProduct];

                jest.spyOn(
                    categoryRepository,
                    'findProducts',
                ).mockResolvedValueOnce(result);

                expect(await categoryService.findProducts(paramDTO)).toBe(
                    result,
                );
            });
            it('should return an empty array', async () => {
                const result = [];

                jest.spyOn(
                    categoryRepository,
                    'findProducts',
                ).mockResolvedValueOnce(result);

                expect(await categoryService.findProducts(paramDTO)).toBe(
                    result,
                );
            });
        });

        describe('findMany', () => {
            it('should return an array of categories', async () => {
                const result = [MockCategory];

                jest.spyOn(
                    categoryRepository,
                    'findMany',
                ).mockResolvedValueOnce(result);

                expect(await categoryService.findMany(queryDTO)).toBe(result);
            });
            describe('findMany', () => {
                it('should return an empty array', async () => {
                    const result = [];

                    jest.spyOn(
                        categoryRepository,
                        'findMany',
                    ).mockResolvedValueOnce(result);

                    expect(await categoryService.findMany(queryDTO)).toBe(
                        result,
                    );
                });
            });

            describe('findOne', () => {
                it('should return a category', async () => {
                    const result = MockCategory;

                    jest.spyOn(
                        categoryRepository,
                        'findOne',
                    ).mockResolvedValueOnce(result);

                    expect(await categoryService.findOne(paramDTO)).toBe(
                        result,
                    );
                });
            });

            describe('register', () => {
                it('should return register a category', async () => {
                    const result = undefined;

                    jest.spyOn(
                        categoryRepository,
                        'register',
                    ).mockResolvedValueOnce(result);

                    expect(await categoryService.register(createDTO)).toBe(
                        result,
                    );
                });
            });

            describe('update', () => {
                it('should return update a category', async () => {
                    const result = undefined;

                    jest.spyOn(
                        categoryRepository,
                        'findOne',
                    ).mockResolvedValueOnce(MockCategory);

                    jest.spyOn(
                        categoryRepository,
                        'update',
                    ).mockResolvedValueOnce(result);

                    expect(
                        await categoryService.update('token', updateDTO),
                    ).toBe(result);
                });
            });

            describe('remove', () => {
                it('should return remove a category', async () => {
                    const result = undefined;

                    jest.spyOn(
                        categoryRepository,
                        'findOne',
                    ).mockResolvedValueOnce(MockCategory);

                    jest.spyOn(
                        categoryRepository,
                        'remove',
                    ).mockResolvedValueOnce(result);

                    expect(await categoryService.remove('token')).toBe(result);
                });
            });
        });

        describe('Exception', () => {
            describe('findOne', () => {
                it('should return NotFound if category nothing exists', async () => {
                    const result = null;

                    jest.spyOn(
                        categoryRepository,
                        'findOne',
                    ).mockResolvedValueOnce(result);

                    await expect(
                        categoryService.findOne(paramDTO),
                    ).rejects.toThrow(NotFoundError);
                });
            });

            describe('update', () => {
                it('should return update a category', async () => {
                    const result = undefined;

                    jest.spyOn(
                        categoryRepository,
                        'findOne',
                    ).mockResolvedValueOnce(result);

                    jest.spyOn(
                        categoryRepository,
                        'update',
                    ).mockResolvedValueOnce(result);

                    await expect(
                        categoryService.update('token', updateDTO),
                    ).rejects.toThrow(NotFoundError);
                });
            });

            describe('remove', () => {
                it('should return remove a category', async () => {
                    const result = undefined;

                    jest.spyOn(
                        categoryRepository,
                        'findOne',
                    ).mockResolvedValueOnce(result);

                    jest.spyOn(
                        categoryRepository,
                        'remove',
                    ).mockResolvedValueOnce(result);

                    await expect(
                        categoryService.remove('token'),
                    ).rejects.toThrow(NotFoundError);
                });
            });
        });
    });
});
