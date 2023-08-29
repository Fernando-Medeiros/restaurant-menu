import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import { MockProduct } from 'mocks/_mockData';
import { ProductCreateDTO } from '../DTOs/product.createDTO';
import { ProductQueryDTO } from '../DTOs/product.queryDTO';
import { ProductUpdateDTO } from '../DTOs/product.updateDTO';
import { ProductRepository } from '../Repository/product.repository';
import { ProductParamDTO } from '../DTOs/product.paramDTO';

describe('Unit - ProductRepository', () => {
    const createDTO: ProductCreateDTO = { ...MockProduct };
    const updateDTO: ProductUpdateDTO = { ...MockProduct };
    const paramDTO: ProductParamDTO = { ...MockProduct };
    const queryDTO = new ProductQueryDTO();

    let prismaService: PrismaService;
    let productRepository: ProductRepository;

    beforeEach(() => {
        prismaService = new PrismaService();
        productRepository = new ProductRepository(prismaService);
    });

    describe('Success', () => {
        describe('findMany', () => {
            const result = [MockProduct];

            it('should return an array of products', async () => {
                jest.spyOn(
                    prismaService.product,
                    'findMany',
                ).mockResolvedValueOnce(result);
                expect(await productRepository.findMany(queryDTO)).toBe(result);
            });

            it('should return an empty array', async () => {
                jest.spyOn(
                    prismaService.product,
                    'findMany',
                ).mockResolvedValueOnce([]);
                expect(
                    await productRepository.findMany(queryDTO),
                ).toStrictEqual([]);
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

                expect(await productRepository.findOne({})).toBe(result);
            });
        });
    });
});
