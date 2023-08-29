import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import { MockProduct, MockProductResource } from 'mocks/_mockData';
import { ProductController } from 'controllers/v1/product.controller';
import { ProductCreateDTO } from '../DTOs/product.createDTO';
import { ProductParamDTO } from '../DTOs/product.paramDTO';
import { ProductQueryDTO } from '../DTOs/product.queryDTO';
import { ProductUpdateDTO } from '../DTOs/product.updateDTO';
import { ProductRepository } from '../Repository/product.repository';
import NotFoundError from 'errors/NotFoundError';
import { ProductService } from '../product.service';

describe('Unit - ProductController', () => {
    const createDTO: ProductCreateDTO = { ...MockProduct };
    const updateDTO: ProductUpdateDTO = { ...MockProduct };
    const paramDTO: ProductParamDTO = { ...MockProduct };
    const queryDTO = new ProductQueryDTO();

    let productService: ProductService;
    let productController: ProductController;

    beforeEach(() => {
        productService = new ProductService(
            new ProductRepository(new PrismaService()),
        );
        productController = new ProductController(productService);
    });

    describe('Success', () => {
        describe('findMany', () => {
            const result = [MockProduct];
            const output = [MockProductResource];

            it('should return an array of products resources', async () => {
                jest.spyOn(productService, 'findMany').mockResolvedValueOnce(
                    result,
                );
                expect(
                    await productController.findMany(queryDTO),
                ).toStrictEqual(output);
            });

            it('should return an empty array', async () => {
                jest.spyOn(productService, 'findMany').mockResolvedValueOnce(
                    [],
                );
                expect(
                    await productController.findMany(queryDTO),
                ).toStrictEqual([]);
            });
        });

        describe('findOne', () => {
            it('should return a product resource', async () => {
                const result = MockProduct;
                const output = MockProductResource;

                jest.spyOn(productService, 'findOne').mockResolvedValueOnce(
                    result,
                );
                expect(await productController.findOne(paramDTO)).toStrictEqual(
                    output,
                );
            });
        });

        describe('register', () => {
            const result = undefined;

            it('should register a product ', async () => {
                jest.spyOn(productService, 'register').mockResolvedValueOnce(
                    result,
                );
                expect(
                    await productController.register(createDTO),
                ).toStrictEqual(result);
            });
        });

        describe('update', () => {
            const result = undefined;

            it('should update a product ', async () => {
                jest.spyOn(productService, 'update').mockResolvedValueOnce(
                    result,
                );
                expect(
                    await productController.update('token', updateDTO),
                ).toStrictEqual(result);
            });
        });

        describe('remove', () => {
            const result = undefined;

            it('should remove a product ', async () => {
                jest.spyOn(productService, 'remove').mockResolvedValueOnce(
                    result,
                );
                expect(await productController.remove('token')).toStrictEqual(
                    result,
                );
            });
        });
    });

    describe('Exception', () => {
        describe('findOne', () => {
            it('should return a NotFound if product not exists', async () => {
                jest.spyOn(productService, 'findOne').mockRejectedValue(
                    new NotFoundError(),
                );
                await expect(
                    productController.findOne({ name: '111' }),
                ).rejects.toThrow(NotFoundError);
            });
        });

        describe('update', () => {
            it('should return a NotFound if product not exists ', async () => {
                jest.spyOn(productService, 'update').mockRejectedValue(
                    new NotFoundError(),
                );
                await expect(
                    productController.update('111', updateDTO),
                ).rejects.toThrow(NotFoundError);
            });
        });

        describe('remove', () => {
            it('should return a NotFound if product not exists', async () => {
                jest.spyOn(productService, 'remove').mockRejectedValue(
                    new NotFoundError(),
                );
                await expect(productController.remove('111')).rejects.toThrow(
                    NotFoundError,
                );
            });
        });
    });
});
