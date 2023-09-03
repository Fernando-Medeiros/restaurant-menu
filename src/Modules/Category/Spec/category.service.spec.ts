import { Test } from '@nestjs/testing';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import {
    CategoryCreateDTO,
    CategoryParamDTO,
    CategoryQueryDTO,
    CategoryRepository,
    CategoryService,
    CategoryUpdateDTO,
} from 'modules/Category/@namespace';
import { BadRequestError, NotFoundError } from 'exceptions/@namespace';
import { MockCategory, MockProduct } from 'mocks/mockData';
import { ProductFilterDTO } from 'modules/Product/@namespace';

describe('Unit - CategoryService', () => {
    const createDTO: CategoryCreateDTO = { ...MockCategory };
    const updateDTO: CategoryUpdateDTO = { ...MockCategory };
    const paramDTO: CategoryParamDTO = { ...MockCategory };
    const filterDTO = new ProductFilterDTO();
    const queryDTO = new CategoryQueryDTO();

    let categoryService: CategoryService;
    let categoryRepository: CategoryRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [],
            providers: [PrismaService, CategoryRepository, CategoryService],
        }).compile();

        categoryService = moduleRef.get<CategoryService>(CategoryService);
        categoryRepository =
            moduleRef.get<CategoryRepository>(CategoryRepository);
    });

    describe('Success', () => {
        describe('findProducts', () => {
            it('should return an array of products', async () => {
                const result = { total: 1, data: [MockProduct] };

                jest.spyOn(
                    categoryRepository,
                    'findProducts',
                ).mockResolvedValueOnce(result);

                expect(
                    await categoryService.findProducts(filterDTO),
                ).toStrictEqual(result);
            });

            it('should return an empty array', async () => {
                const result = { total: 0, data: [] };

                jest.spyOn(
                    categoryRepository,
                    'findProducts',
                ).mockResolvedValueOnce(result);

                expect(
                    await categoryService.findProducts(filterDTO),
                ).toStrictEqual(result);
            });
        });

        describe('findMany', () => {
            it('should return an array of categories', async () => {
                const result = { total: 1, data: [MockCategory] };

                jest.spyOn(
                    categoryRepository,
                    'findMany',
                ).mockResolvedValueOnce(result);
                expect(await categoryService.findMany(queryDTO)).toStrictEqual(
                    result,
                );
            });

            describe('findMany', () => {
                it('should return an empty array', async () => {
                    const result = { total: 0, data: [MockCategory] };

                    jest.spyOn(
                        categoryRepository,
                        'findMany',
                    ).mockResolvedValueOnce(result);

                    expect(
                        await categoryService.findMany(queryDTO),
                    ).toStrictEqual(result);
                });
            });

            describe('findOne', () => {
                const result = MockCategory;

                it('should return a category', async () => {
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
                const result = undefined;

                it('should register a category', async () => {
                    jest.spyOn(
                        categoryRepository,
                        'findOne',
                    ).mockResolvedValueOnce(result);

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
                const result = undefined;

                it('should update a category', async () => {
                    jest.spyOn(
                        categoryRepository,
                        'findOne',
                    ).mockResolvedValueOnce(MockCategory);

                    jest.spyOn(
                        categoryRepository,
                        'update',
                    ).mockResolvedValueOnce(result);

                    expect(await categoryService.update('111', updateDTO)).toBe(
                        result,
                    );
                });
            });

            describe('remove', () => {
                const result = undefined;

                it('should remove a category', async () => {
                    jest.spyOn(
                        categoryRepository,
                        'findOne',
                    ).mockResolvedValueOnce(MockCategory);

                    jest.spyOn(
                        categoryRepository,
                        'remove',
                    ).mockResolvedValueOnce(result);

                    expect(await categoryService.remove('111')).toBe(result);
                });
            });
        });

        describe('Exception', () => {
            const result = null;

            describe('findOne', () => {
                it('should return NotFound if category nothing exists', async () => {
                    jest.spyOn(
                        categoryRepository,
                        'findOne',
                    ).mockResolvedValueOnce(result);

                    await expect(
                        categoryService.findOne(paramDTO),
                    ).rejects.toThrow(NotFoundError);
                });
            });

            describe('register', () => {
                const result = undefined;

                it('should return BadRequest if category nothing exists', async () => {
                    jest.spyOn(
                        categoryRepository,
                        'findOne',
                    ).mockResolvedValueOnce(MockCategory);

                    jest.spyOn(
                        categoryRepository,
                        'register',
                    ).mockResolvedValueOnce(result);

                    await expect(
                        categoryService.register(createDTO),
                    ).rejects.toThrow(BadRequestError);
                });
            });

            describe('update', () => {
                const result = undefined;

                it('should return NotFound if category nothing exists', async () => {
                    jest.spyOn(
                        categoryRepository,
                        'findOne',
                    ).mockResolvedValueOnce(result);

                    jest.spyOn(
                        categoryRepository,
                        'update',
                    ).mockResolvedValueOnce(result);

                    await expect(
                        categoryService.update(MockCategory.token, updateDTO),
                    ).rejects.toThrow(NotFoundError);
                });
            });

            describe('remove', () => {
                const result = undefined;

                it('should return NotFound if category nothing exists', async () => {
                    jest.spyOn(
                        categoryRepository,
                        'findOne',
                    ).mockResolvedValueOnce(result);

                    jest.spyOn(
                        categoryRepository,
                        'remove',
                    ).mockResolvedValueOnce(result);

                    await expect(
                        categoryService.remove(MockCategory.token),
                    ).rejects.toThrow(NotFoundError);
                });
            });
        });
    });
});
