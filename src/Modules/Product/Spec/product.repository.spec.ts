import { Test } from '@nestjs/testing';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import {
    ProductCreateDTO,
    ProductParamDTO,
    ProductQueryDTO,
    ProductRepository,
    ProductUpdateDTO,
} from 'modules/Product/@namespace';
import { MockProduct } from 'mocks/mockData';

describe('Unit - ProductRepository', () => {
    const createInput: ProductCreateDTO = { ...MockProduct };
    const updateInput: ProductUpdateDTO = { ...MockProduct };
    const paramInput: ProductParamDTO = { ...MockProduct };
    const queryInput = new ProductQueryDTO();

    let repository: ProductRepository;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [],
            providers: [PrismaService, ProductRepository],
        }).compile();

        repository = moduleRef.get<ProductRepository>(ProductRepository);
    });

    describe('Success', () => {
        describe('findMany', () => {
            it('should return an array of products', async () => {
                const output = { total: 1, data: [MockProduct] };

                const spy = jest
                    .spyOn(repository, 'findMany')
                    .mockResolvedValueOnce(output);

                expect(await repository.findMany(queryInput)).toStrictEqual(
                    output,
                );
                expect(spy).toHaveBeenCalledWith(queryInput);
            });

            it('should return an empty array', async () => {
                const output = { total: 0, data: [] };

                const spy = jest
                    .spyOn(repository, 'findMany')
                    .mockResolvedValueOnce(output);

                expect(await repository.findMany(queryInput)).toStrictEqual(
                    output,
                );
                expect(spy).toHaveBeenCalledWith(queryInput);
            });
        });

        describe('findOne', () => {
            it('should return a product', async () => {
                const output = MockProduct;

                const spy = jest
                    .spyOn(repository, 'findOne')
                    .mockResolvedValueOnce(output);

                expect(await repository.findOne(paramInput)).toStrictEqual(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(paramInput);
            });

            it('should return a null our undefined', async () => {
                const output = null;

                const spy = jest
                    .spyOn(repository, 'findOne')
                    .mockResolvedValueOnce(output);

                expect(await repository.findOne(paramInput)).toStrictEqual(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(paramInput);
            });
        });

        describe('register', () => {
            it('should register a product', async () => {
                const output = undefined;

                const spy = jest
                    .spyOn(repository, 'register')
                    .mockResolvedValueOnce(output);

                expect(await repository.register(createInput)).toStrictEqual(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(createInput);
            });
        });

        describe('update', () => {
            it('should update a product', async () => {
                const output = undefined;

                const spy = jest
                    .spyOn(repository, 'update')
                    .mockResolvedValueOnce(output);

                expect(
                    await repository.update(MockProduct.token, updateInput),
                ).toStrictEqual(output);

                expect(spy).toHaveBeenCalledWith(
                    MockProduct.token,
                    updateInput,
                );
            });
        });

        describe('remove', () => {
            it('should remove a product', async () => {
                const output = undefined;

                const spy = jest
                    .spyOn(repository, 'remove')
                    .mockResolvedValueOnce(output);

                expect(
                    await repository.remove(MockProduct.token),
                ).toStrictEqual(output);

                expect(spy).toHaveBeenCalledWith(MockProduct.token);
            });
        });
    });
});
