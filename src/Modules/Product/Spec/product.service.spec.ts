import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import { MockProduct } from 'mocks/_mockData';
import { ProductCreateDTO } from '../DTOs/product.createDTO';
import { ProductQueryDTO } from '../DTOs/product.queryDTO';
import { ProductUpdateDTO } from '../DTOs/product.updateDTO';
import { ProductRepository } from '../Repository/product.repository';
import { ProductParamDTO } from '../DTOs/product.paramDTO';
import NotFoundError from 'errors/NotFoundError';
import { ProductService } from '../product.service';

describe('Unit - ProductService', () => {
    const createDTO: ProductCreateDTO = { ...MockProduct };
    const updateDTO: ProductUpdateDTO = { ...MockProduct };
    const paramDTO: ProductParamDTO = { ...MockProduct };
    const queryDTO = new ProductQueryDTO();

    let productRepository: ProductRepository;
    let productService: ProductService;

    beforeEach(() => {
        productRepository = new ProductRepository(new PrismaService());
        productService = new ProductService(productRepository);
    });

    describe('Success', () => {
        describe('findMany', () => {
            const result = [MockProduct];

            it('should return an array of products', async () => {
                jest.spyOn(productRepository, 'findMany').mockResolvedValueOnce(
                    result,
                );
                expect(await productService.findMany(queryDTO)).toBe(result);
            });

            it('should return an empty array', async () => {
                jest.spyOn(productRepository, 'findMany').mockResolvedValueOnce(
                    [],
                );
                expect(await productService.findMany(queryDTO)).toStrictEqual(
                    [],
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

            it('should return register a product', async () => {
                jest.spyOn(productRepository, 'register').mockResolvedValueOnce(
                    result,
                );
                expect(await productService.register(createDTO)).toBe(result);
            });
        });

        describe('update', () => {
            const result = undefined;

            it('should return update a product', async () => {
                jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(
                    MockProduct,
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

            it('should return remove a product', async () => {
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
                await expect(productService.findOne({})).rejects.toThrow(
                    NotFoundError,
                );
            });
        });

        describe('update', () => {
            const result = undefined;

            it('should return NotFound if product nothing exists', async () => {
                jest.spyOn(productRepository, 'findOne').mockResolvedValueOnce(
                    result,
                );
                jest.spyOn(productRepository, 'update').mockResolvedValueOnce(
                    result,
                );
                await expect(
                    productService.update('token', updateDTO),
                ).rejects.toThrow(NotFoundError);
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
