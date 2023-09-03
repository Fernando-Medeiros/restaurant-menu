import { Test } from '@nestjs/testing';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import {
    ProductCreateDTO,
    ProductParamDTO,
    ProductQueryDTO,
    ProductRepository,
    ProductUpdateDTO,
    ProductService,
} from 'modules/Product/@namespace';
import {
    CategoryRepository,
    CategoryService,
} from 'modules/Category/@namespace';
import { MockProduct } from 'mocks/mockData';
import { BadRequestError, NotFoundError } from 'exceptions/@namespace';

describe('Unit - ProductService', () => {
    const createDTO: ProductCreateDTO = { ...MockProduct };
    const updateDTO: ProductUpdateDTO = { ...MockProduct };
    const paramDTO: ProductParamDTO = { ...MockProduct };
    const queryDTO = new ProductQueryDTO();

    let productRepository: ProductRepository;
    let productService: ProductService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [],
            providers: [
                PrismaService,
                ProductService,
                ProductRepository,
                CategoryService,
                CategoryRepository,
            ],
        }).compile();

        productRepository = moduleRef.get<ProductRepository>(ProductRepository);
        productService = moduleRef.get<ProductService>(ProductService);
    });

    describe('Success', () => {
        describe('findMany', () => {
            const result = { total: 1, data: [MockProduct] };

            it('should return an paginate of products', async () => {
                jest.spyOn(productRepository, 'findMany').mockResolvedValueOnce(
                    result,
                );

                expect(await productService.findMany(queryDTO)).toStrictEqual(
                    result,
                );
            });

            it('should return an empty paginate', async () => {
                const result = { total: 0, data: [] };

                jest.spyOn(productRepository, 'findMany').mockResolvedValueOnce(
                    result,
                );
                expect(await productService.findMany(queryDTO)).toStrictEqual(
                    result,
                );
            });
        });

        describe('findOne', () => {
            const result = MockProduct;

            it('should return a product', async () => {
                jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(
                    result,
                );
                expect(await productService.findOne(paramDTO)).toBe(result);
            });
        });

        describe('register', () => {
            const result = undefined;

            it('should  register a product', async () => {
                jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(
                    result,
                );

                jest.spyOn(productRepository, 'register').mockResolvedValueOnce(
                    result,
                );

                expect(await productService.register(createDTO)).toBe(result);
            });
        });

        describe('update', () => {
            const result = undefined;

            it('should  update a product', async () => {
                jest.spyOn(productService, 'findOne').mockResolvedValueOnce(
                    MockProduct,
                );

                jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(
                    result,
                );

                jest.spyOn(productRepository, 'update').mockResolvedValueOnce(
                    result,
                );

                expect(
                    await productService.update(MockProduct.token, updateDTO),
                ).toBe(result);
            });
        });

        describe('remove', () => {
            const result = undefined;

            it('should remove a product', async () => {
                jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(
                    MockProduct,
                );
                jest.spyOn(productRepository, 'remove').mockResolvedValueOnce(
                    result,
                );
                expect(await productService.remove(MockProduct.token)).toBe(
                    result,
                );
            });
        });
    });

    describe('Exception', () => {
        describe('findOne', () => {
            const result = null;

            it('should return NotFound if product nothing exists', async () => {
                jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(
                    result,
                );
                await expect(productService.findOne(Object())).rejects.toThrow(
                    NotFoundError,
                );
            });
        });

        describe('register', () => {
            it('should return BadRequest if product already exists', async () => {
                jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(
                    MockProduct,
                );

                await expect(
                    productService.register(createDTO),
                ).rejects.toThrow(BadRequestError);
            });
        });

        describe('update', () => {
            const result = undefined;

            it('should return NotFound if product nothing exists', async () => {
                jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(
                    result,
                );

                await expect(
                    productService.update('token', updateDTO),
                ).rejects.toThrow(NotFoundError);
            });

            it('should return BadRequest if product already exists', async () => {
                jest.spyOn(productService, 'findOne').mockResolvedValueOnce(
                    MockProduct,
                );

                jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(
                    MockProduct,
                );

                await expect(
                    productService.update('token', updateDTO),
                ).rejects.toThrow(BadRequestError);
            });
        });

        describe('remove', () => {
            const result = undefined;

            it('should return NotFound if product nothing exists', async () => {
                jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(
                    result,
                );
                jest.spyOn(productRepository, 'remove').mockResolvedValueOnce(
                    result,
                );
                await expect(productService.remove('token')).rejects.toThrow(
                    NotFoundError,
                );
            });
        });
    });
});
