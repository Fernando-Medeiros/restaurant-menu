import { Test } from '@nestjs/testing';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import { ProductController } from 'controllers/v1/@namespace';
import {
    ProductCreateDTO,
    ProductParamDTO,
    ProductQueryDTO,
    ProductRepository,
    ProductService,
    ProductUpdateDTO,
} from 'modules/Product/@namespace';
import {
    CategoryRepository,
    CategoryService,
} from 'modules/Category/@namespace';
import { MockProduct, MockProductResource } from 'mocks/mockData';
import { PaginateProduct } from 'modulesHelpers/Pagination/@namespace';
import { BadRequestError, NotFoundError } from 'exceptions/@namespace';

describe('Unit - ProductController', () => {
    const createInput: ProductCreateDTO = { ...MockProduct };
    const updateInput: ProductUpdateDTO = { ...MockProduct };
    const paramInput: ProductParamDTO = { ...MockProduct };
    const queryInput = new ProductQueryDTO();
    const requestInput = { url: 'api/v1/' };

    let controller: ProductController;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                PrismaService,
                ProductRepository,
                CategoryRepository,
                CategoryService,
                ProductService,
            ],
        }).compile();

        controller = moduleRef.get<ProductController>(ProductController);
    });

    describe('Success', () => {
        describe('findMany', () => {
            it('should return an paginate of products resources', async () => {
                const output = new PaginateProduct({
                    ...{ total: 2, data: [MockProduct, MockProduct] },
                    ...requestInput,
                    ...queryInput,
                });

                const spy = jest
                    .spyOn(controller, 'findMany')
                    .mockResolvedValueOnce(output);

                expect(
                    await controller.findMany(requestInput, queryInput),
                ).toStrictEqual(output);

                expect(spy).toHaveBeenCalledWith(requestInput, queryInput);
            });

            it('should return an paginate of  empty resources', async () => {
                const output = new PaginateProduct({
                    ...{ total: 0, data: [] },
                    ...requestInput,
                    ...queryInput,
                });

                const spy = jest
                    .spyOn(controller, 'findMany')
                    .mockResolvedValueOnce(output);

                expect(
                    await controller.findMany(requestInput, queryInput),
                ).toStrictEqual(output);

                expect(spy).toHaveBeenCalledWith(requestInput, queryInput);
            });
        });

        describe('findOne', () => {
            it('should return a product resource', async () => {
                const output = MockProductResource;

                const spy = jest
                    .spyOn(controller, 'findOne')
                    .mockResolvedValueOnce(output);

                expect(await controller.findOne(paramInput)).toStrictEqual(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(paramInput);
            });
        });

        describe('register', () => {
            it('should register a product ', async () => {
                const output = undefined;

                const spy = jest
                    .spyOn(controller, 'register')
                    .mockResolvedValueOnce(output);

                expect(await controller.register(createInput)).toStrictEqual(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(createInput);
            });
        });

        describe('update', () => {
            it('should update a product ', async () => {
                const output = undefined;

                const spy = jest
                    .spyOn(controller, 'update')
                    .mockResolvedValueOnce(output);

                expect(
                    await controller.update(MockProduct.token, updateInput),
                ).toStrictEqual(output);

                expect(spy).toHaveBeenCalledWith(
                    MockProduct.token,
                    updateInput,
                );
            });
        });

        describe('remove', () => {
            it('should remove a product ', async () => {
                const output = undefined;

                const spy = jest
                    .spyOn(controller, 'remove')
                    .mockResolvedValueOnce(output);

                expect(
                    await controller.remove(MockProduct.token),
                ).toStrictEqual(output);

                expect(spy).toHaveBeenCalledWith(MockProduct.token);
            });
        });
    });

    describe('Exception', () => {
        describe('findOne', () => {
            it('should return a NotFound if product not exists', async () => {
                const output = NotFoundError;

                const spy = jest
                    .spyOn(controller, 'findOne')
                    .mockRejectedValueOnce(new output());

                await expect(
                    controller.findOne({ ...MockProduct }),
                ).rejects.toThrow(output);

                expect(spy).toHaveBeenCalledWith({ ...MockProduct });
            });
        });

        describe('update', () => {
            it('should return a NotFound if product not exists ', async () => {
                const output = NotFoundError;

                const spy = jest
                    .spyOn(controller, 'update')
                    .mockRejectedValueOnce(new output());

                await expect(
                    controller.update(MockProduct.token, updateInput),
                ).rejects.toThrow(output);

                expect(spy).toHaveBeenCalledWith(
                    MockProduct.token,
                    updateInput,
                );
            });

            it('should return a BadRequest if categoryID not exists ', async () => {
                const output = BadRequestError;

                const spy = jest
                    .spyOn(controller, 'update')
                    .mockRejectedValueOnce(new output());

                await expect(
                    controller.update(MockProduct.token, updateInput),
                ).rejects.toThrow(output);

                expect(spy).toHaveBeenCalledWith(
                    MockProduct.token,
                    updateInput,
                );
            });
        });

        describe('remove', () => {
            it('should return a NotFound if product not exists', async () => {
                const output = NotFoundError;

                const spy = jest
                    .spyOn(controller, 'remove')
                    .mockRejectedValueOnce(new output());

                await expect(
                    controller.remove(MockProduct.token),
                ).rejects.toThrow(output);

                expect(spy).toHaveBeenCalledWith(MockProduct.token);
            });
        });
    });
});
