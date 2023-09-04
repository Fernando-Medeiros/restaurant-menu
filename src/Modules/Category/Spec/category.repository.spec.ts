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
import { MockCategory, MockProduct } from 'mocks/mockData';
import { ProductFilterDTO } from 'modules/Product/@namespace';

describe('Unit - CategoryRepository', () => {
    const createDTO: CategoryCreateDTO = { ...MockCategory };
    const updateDTO: CategoryUpdateDTO = { ...MockCategory };
    const paramDTO: CategoryParamDTO = { ...MockCategory };
    const filterDTO = new ProductFilterDTO();
    const queryDTO = new CategoryQueryDTO();

    let prismaService: PrismaService;
    let categoryRepository: CategoryRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [],
            providers: [PrismaService, CategoryRepository, CategoryService],
        }).compile();

        prismaService = moduleRef.get<PrismaService>(PrismaService);
        categoryRepository =
            moduleRef.get<CategoryRepository>(CategoryRepository);
    });

    describe('findProducts', () => {
        it('should return an array of products', async () => {
            const result = { total: 1, data: [MockProduct] };

            const spy = jest
                .spyOn(categoryRepository, 'findProducts')
                .mockResolvedValueOnce(result);

            expect(
                await categoryRepository.findProducts(filterDTO),
            ).toStrictEqual(result);

            expect(spy).toHaveBeenCalledWith(filterDTO);
        });

        it('should return an empty array', async () => {
            const result = { total: 0, data: [] };

            const spy = jest
                .spyOn(categoryRepository, 'findProducts')
                .mockResolvedValueOnce(result);

            expect(
                await categoryRepository.findProducts(filterDTO),
            ).toStrictEqual(result);

            expect(spy).toHaveBeenCalledWith(filterDTO);
        });
    });

    describe('findMany', () => {
        it('should return an array of categories', async () => {
            const result = { total: 1, data: [MockCategory] };

            jest.spyOn(prismaService.category, 'count').mockResolvedValueOnce(
                result.total,
            );

            jest.spyOn(
                prismaService.category,
                'findMany',
            ).mockResolvedValueOnce(result.data);

            expect(await categoryRepository.findMany(queryDTO)).toStrictEqual(
                result,
            );
        });
    });

    describe('findOne', () => {
        const result = MockCategory;

        it('should return a category', async () => {
            jest.spyOn(
                prismaService.category,
                'findFirst',
            ).mockResolvedValueOnce(result);

            expect(await categoryRepository.findOne(paramDTO)).toBe(result);
        });
    });

    describe('register', () => {
        const result = undefined;

        it('should register a category', async () => {
            jest.spyOn(prismaService.category, 'create').mockImplementation(
                () => result,
            );

            expect(await categoryRepository.register(createDTO)).toBe(result);
        });
    });

    describe('update', () => {
        const result = undefined;

        it('should update a category', async () => {
            jest.spyOn(prismaService.category, 'update').mockImplementation(
                result,
            );

            expect(
                await categoryRepository.update(MockCategory.token, updateDTO),
            ).toBe(result);
        });
    });

    describe('remove', () => {
        const result = undefined;

        it('should remove a category', async () => {
            jest.spyOn(prismaService.category, 'delete').mockImplementation(
                () => result,
            );

            expect(await categoryRepository.remove(MockCategory.token)).toBe(
                result,
            );
        });
    });
});
