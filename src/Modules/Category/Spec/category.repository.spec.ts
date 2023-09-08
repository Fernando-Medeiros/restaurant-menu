import { Test } from '@nestjs/testing';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import {
    CategoryCreateDTO,
    CategoryParamDTO,
    CategoryQueryDTO,
    CategoryRepository,
    CategoryUpdateDTO,
} from 'modules/Category/@namespace';
import { MockCategory, MockProduct } from 'mocks/mockData';
import { ProductFilterDTO } from 'modules/Product/@namespace';

describe('Unit - CategoryRepository', () => {
    const createInput: CategoryCreateDTO = { ...MockCategory };
    const updateInput: CategoryUpdateDTO = { ...MockCategory };
    const paramInput: CategoryParamDTO = { ...MockCategory };
    const queryInput = new CategoryQueryDTO();
    const filterInput = new ProductFilterDTO();

    let repository: CategoryRepository;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [],
            providers: [PrismaService, CategoryRepository],
        }).compile();

        repository = moduleRef.get<CategoryRepository>(CategoryRepository);
    });

    describe('findProducts', () => {
        it('should return an array of products', async () => {
            const output = { total: 2, data: [MockProduct, MockProduct] };

            const spy = jest
                .spyOn(repository, 'findProducts')
                .mockResolvedValueOnce(output);

            expect(await repository.findProducts(filterInput)).toStrictEqual(
                output,
            );

            expect(spy).toHaveBeenCalledWith(filterInput);
        });

        it('should return an empty array', async () => {
            const output = { total: 0, data: [] };

            const spy = jest
                .spyOn(repository, 'findProducts')
                .mockResolvedValueOnce(output);

            expect(await repository.findProducts(filterInput)).toStrictEqual(
                output,
            );

            expect(spy).toHaveBeenCalledWith(filterInput);
        });
    });

    describe('findMany', () => {
        it('should return an array of categories', async () => {
            const output = { total: 2, data: [MockCategory, MockCategory] };

            const spy = jest
                .spyOn(repository, 'findMany')
                .mockResolvedValueOnce(output);

            expect(await repository.findMany(queryInput)).toStrictEqual(output);

            expect(spy).toHaveBeenCalledWith(queryInput);
        });

        it('should return an empty array', async () => {
            const output = { total: 0, data: [] };

            const spy = jest
                .spyOn(repository, 'findMany')
                .mockResolvedValueOnce(output);

            expect(await repository.findMany(queryInput)).toStrictEqual(output);

            expect(spy).toHaveBeenCalledWith(queryInput);
        });
    });

    describe('findOne', () => {
        it('should return a category', async () => {
            const output = MockCategory;

            const spy = jest
                .spyOn(repository, 'findOne')
                .mockResolvedValueOnce(output);

            expect(await repository.findOne(paramInput)).toBe(output);

            expect(spy).toHaveBeenCalledWith(paramInput);
        });

        it('should return a null or undefined', async () => {
            const output = null;

            const spy = jest
                .spyOn(repository, 'findOne')
                .mockResolvedValueOnce(output);

            expect(await repository.findOne(paramInput)).toBe(output);

            expect(spy).toHaveBeenCalledWith(paramInput);
        });
    });

    describe('register', () => {
        it('should register a category', async () => {
            const output = MockCategory;

            const spy = jest
                .spyOn(repository, 'register')
                .mockResolvedValueOnce(output);

            expect(await repository.register(createInput)).toBe(output);

            expect(spy).toHaveBeenCalledWith(createInput);
        });
    });

    describe('update', () => {
        it('should update a category', async () => {
            const output = undefined;

            const spy = jest
                .spyOn(repository, 'update')
                .mockResolvedValueOnce(output);

            expect(
                await repository.update(MockCategory.token, updateInput),
            ).toBe(output);

            expect(spy).toHaveBeenCalledWith(MockCategory.token, updateInput);
        });
    });

    describe('remove', () => {
        it('should remove a category', async () => {
            const output = undefined;

            const spy = jest
                .spyOn(repository, 'remove')
                .mockResolvedValueOnce(output);

            expect(await repository.remove(MockCategory.token)).toBe(output);

            expect(spy).toHaveBeenCalledWith(MockCategory.token);
        });
    });
});
