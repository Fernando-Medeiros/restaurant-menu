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
    const createDTO: ProductCreateDTO = { ...MockProduct };
    const updateDTO: ProductUpdateDTO = { ...MockProduct };
    const paramDTO: ProductParamDTO = { ...MockProduct };
    const queryDTO = new ProductQueryDTO();

    let prismaService: PrismaService;
    let productRepository: ProductRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [],
            providers: [PrismaService, ProductRepository],
        }).compile();

        prismaService = moduleRef.get<PrismaService>(PrismaService);
        productRepository = moduleRef.get<ProductRepository>(ProductRepository);
    });

    describe('Success', () => {
        describe('findMany', () => {
            it('should return an array of products', async () => {
                const result = { total: 1, data: [MockProduct] };

                jest.spyOn(
                    prismaService.product,
                    'count',
                ).mockResolvedValueOnce(result.total);

                jest.spyOn(
                    prismaService.product,
                    'findMany',
                ).mockResolvedValueOnce(result.data);

                expect(
                    await productRepository.findMany(queryDTO),
                ).toStrictEqual(result);
            });

            it('should return an empty array', async () => {
                const result = { total: 0, data: [] };

                jest.spyOn(
                    prismaService.product,
                    'count',
                ).mockResolvedValueOnce(result.total);

                jest.spyOn(
                    prismaService.product,
                    'findMany',
                ).mockResolvedValueOnce([]);

                expect(
                    await productRepository.findMany(queryDTO),
                ).toStrictEqual(result);
            });
        });

        describe('findOne', () => {
            const result = MockProduct;

            it('should return a product', async () => {
                jest.spyOn(
                    prismaService.product,
                    'findFirst',
                ).mockResolvedValueOnce(result);

                expect(await productRepository.findOne(paramDTO)).toBe(result);
            });
        });

        describe('register', () => {
            const result = undefined;

            it('should register a product', async () => {
                jest.spyOn(
                    prismaService.product,
                    'create',
                ).mockResolvedValueOnce(result);

                expect(await productRepository.register(createDTO)).toBe(
                    result,
                );
            });
        });

        describe('update', () => {
            const result = undefined;

            it('should update a product', async () => {
                jest.spyOn(
                    prismaService.product,
                    'update',
                ).mockResolvedValueOnce(result);

                expect(
                    await productRepository.update(
                        MockProduct.token,
                        updateDTO,
                    ),
                ).toBe(result);
            });
        });

        describe('remove', () => {
            const result = undefined;

            it('should remove a product', async () => {
                jest.spyOn(
                    prismaService.product,
                    'delete',
                ).mockResolvedValueOnce(result);

                expect(await productRepository.remove(MockProduct.token)).toBe(
                    result,
                );
            });
        });
    });

    describe('Exception', () => {
        describe('findOne', () => {
            const result = null;

            it('should return null when passing blank data', async () => {
                jest.spyOn(
                    prismaService.product,
                    'findFirst',
                ).mockResolvedValueOnce(result);

                expect(await productRepository.findOne(Object())).toBe(result);
            });
        });
    });
});
