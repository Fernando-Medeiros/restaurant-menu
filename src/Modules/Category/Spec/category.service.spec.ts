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
import { NotFoundError } from 'exceptions/@namespace';
import { MockCategory, MockProduct } from 'mocks/mockData';

describe('Unit - CategoryService', () => {
    const createDTO: CategoryCreateDTO = { ...MockCategory };
    const updateDTO: CategoryUpdateDTO = { ...MockCategory };
    const paramDTO: CategoryParamDTO = { ...MockCategory };
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
            const result = [MockProduct];

            it('should return an array of products', async () => {
                jest.spyOn(
                    categoryRepository,
                    'findProducts',
                ).mockImplementation(async () => result);

                expect(await categoryService.findProducts(paramDTO)).toBe(
                    result,
                );
            });

            it('should return an empty array', async () => {
                jest.spyOn(
                    categoryRepository,
                    'findProducts',
                ).mockImplementation(async () => []);

                expect(
                    await categoryService.findProducts(paramDTO),
                ).toStrictEqual([]);
            });
        });

        describe('findMany', () => {
            const result = [MockCategory];

            it('should return an array of categories', async () => {
                jest.spyOn(categoryRepository, 'findMany').mockImplementation(
                    async () => result,
                );
                expect(await categoryService.findMany(queryDTO)).toBe(result);
            });

            describe('findMany', () => {
                it('should return an empty array', async () => {
                    jest.spyOn(
                        categoryRepository,
                        'findMany',
                    ).mockImplementation(async () => []);

                    expect(
                        await categoryService.findMany(queryDTO),
                    ).toStrictEqual([]);
                });
            });

            describe('findOne', () => {
                const result = MockCategory;

                it('should return a category', async () => {
                    jest.spyOn(
                        categoryRepository,
                        'findOne',
                    ).mockImplementation(async () => result);

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
                        'register',
                    ).mockImplementation(async () => result);

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
                    ).mockImplementation(async () => MockCategory);

                    jest.spyOn(categoryRepository, 'update').mockImplementation(
                        async () => result,
                    );

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
                    ).mockImplementation(async () => MockCategory);

                    jest.spyOn(categoryRepository, 'remove').mockImplementation(
                        async () => result,
                    );

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
                    ).mockImplementation(async () => result);

                    await expect(
                        categoryService.findOne(paramDTO),
                    ).rejects.toThrow(NotFoundError);
                });
            });

            describe('update', () => {
                const result = undefined;

                it('should return NotFound if category nothing exists', async () => {
                    jest.spyOn(
                        categoryRepository,
                        'findOne',
                    ).mockImplementation(async () => result);

                    jest.spyOn(categoryRepository, 'update').mockImplementation(
                        async () => result,
                    );

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
                    ).mockImplementation(async () => result);

                    jest.spyOn(categoryRepository, 'remove').mockImplementation(
                        async () => result,
                    );

                    await expect(
                        categoryService.remove(MockCategory.token),
                    ).rejects.toThrow(NotFoundError);
                });
            });
        });
    });
});
