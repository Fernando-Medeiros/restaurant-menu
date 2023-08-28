import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import { CategoryRepository } from '../Repository/category.repository';
import { CategoryParamDTO } from '../DTOs/category.paramDTO';
import { CategoryQueryDTO } from '../DTOs/category.queryDTO';
import { CategoryCreateDTO } from '../DTOs/category.createDTO';
import { CategoryUpdateDTO } from '../DTOs/category.updateDTO';
import { MockCategory, MockProduct } from 'mocks/_mockData';

describe('Unit - CategoryRepository', () => {
    let createDTO: CategoryCreateDTO;
    let updateDTO: CategoryUpdateDTO;
    let queryDTO: CategoryQueryDTO;
    let paramDTO: CategoryParamDTO;
    let prismaService: PrismaService;
    let categoryRepository: CategoryRepository;

    beforeEach(() => {
        createDTO = new CategoryCreateDTO();
        updateDTO = new CategoryUpdateDTO();
        queryDTO = new CategoryQueryDTO();
        paramDTO = new CategoryParamDTO();
        prismaService = new PrismaService();
        categoryRepository = new CategoryRepository(prismaService);
    });

    describe('findProducts', () => {
        it('should return an array of products', async () => {
            const result = [MockProduct];

            jest.spyOn(prismaService.product, 'findMany').mockResolvedValueOnce(
                result,
            );

            expect(await categoryRepository.findProducts(paramDTO)).toBe(
                result,
            );
        });
    });

    describe('findMany', () => {
        it('should return an array of categories', async () => {
            const result = [MockCategory];

            jest.spyOn(
                prismaService.category,
                'findMany',
            ).mockResolvedValueOnce(result);

            expect(await categoryRepository.findMany(queryDTO)).toBe(result);
        });
    });

    describe('findOne', () => {
        it('should return a category', async () => {
            const result = MockCategory;

            jest.spyOn(
                prismaService.category,
                'findFirst',
            ).mockResolvedValueOnce(result);

            expect(await categoryRepository.findOne(paramDTO)).toBe(result);
        });
    });

    describe('register', () => {
        it('should register a category', async () => {
            const result = undefined;

            jest.spyOn(prismaService.category, 'create').mockResolvedValueOnce(
                result,
            );

            expect(await categoryRepository.register(createDTO)).toBe(result);
        });
    });

    describe('update', () => {
        it('should update a category', async () => {
            const result = undefined;

            jest.spyOn(prismaService.category, 'update').mockResolvedValueOnce(
                result,
            );

            expect(await categoryRepository.update('token', updateDTO)).toBe(
                result,
            );
        });
    });

    describe('remove', () => {
        it('should remove a category', async () => {
            const result = undefined;

            jest.spyOn(prismaService.category, 'delete').mockResolvedValueOnce(
                result,
            );

            expect(await categoryRepository.remove('token')).toBe(result);
        });
    });
});
