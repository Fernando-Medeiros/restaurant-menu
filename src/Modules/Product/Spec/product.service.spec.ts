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
    const createInput: ProductCreateDTO = { ...MockProduct };
    const updateInput: ProductUpdateDTO = { ...MockProduct };
    const paramInput: ProductParamDTO = { ...MockProduct };
    const queryInput = new ProductQueryDTO();

    let service: ProductService;

    beforeAll(async () => {
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

        service = moduleRef.get<ProductService>(ProductService);
    });

    describe('Success', () => {
        describe('findMany', () => {
            it('should return an array of products', async () => {
                const output = { total: 2, data: [MockProduct, MockProduct] };

                const spy = jest
                    .spyOn(service, 'findMany')
                    .mockResolvedValueOnce(output);

                expect(await service.findMany(queryInput)).toStrictEqual(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(queryInput);
            });

            it('should return an empty', async () => {
                const output = { total: 0, data: [] };

                const spy = jest
                    .spyOn(service, 'findMany')
                    .mockResolvedValueOnce(output);

                expect(await service.findMany(queryInput)).toStrictEqual(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(queryInput);
            });
        });

        describe('findOne', () => {
            it('should return a product', async () => {
                const output = MockProduct;

                const spy = jest
                    .spyOn(service, 'findOne')
                    .mockResolvedValueOnce(output);

                expect(await service.findOne(paramInput)).toStrictEqual(output);

                expect(spy).toHaveBeenCalledWith(paramInput);
            });
        });

        describe('register', () => {
            it('should  register a product', async () => {
                const output = undefined;

                const spy = jest
                    .spyOn(service, 'register')
                    .mockResolvedValueOnce(output);

                expect(await service.register(createInput)).toStrictEqual(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(createInput);
            });
        });

        describe('update', () => {
            it('should  update a product', async () => {
                const output = undefined;

                const spy = jest
                    .spyOn(service, 'update')
                    .mockResolvedValueOnce(output);

                expect(
                    await service.update(MockProduct.token, updateInput),
                ).toBe(output);

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
                    .spyOn(service, 'remove')
                    .mockResolvedValueOnce(output);

                expect(await service.remove(MockProduct.token)).toStrictEqual(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(MockProduct.token);
            });
        });
    });

    describe('Exception', () => {
        describe('findOne', () => {
            it('should return NotFound if product nothing exists', async () => {
                const output = NotFoundError;

                const spy = jest
                    .spyOn(service, 'findOne')
                    .mockRejectedValueOnce(new output());

                await expect(service.findOne(paramInput)).rejects.toThrow(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(paramInput);
            });
        });

        describe('register', () => {
            it('should return BadRequest if product name already exists', async () => {
                const output = BadRequestError;

                const spy = jest
                    .spyOn(service, 'register')
                    .mockRejectedValueOnce(new output());

                await expect(service.register(createInput)).rejects.toThrow(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(createInput);
            });
        });

        describe('update', () => {
            it('should return NotFound if product nothing exists', async () => {
                const output = NotFoundError;

                const spy = jest
                    .spyOn(service, 'update')
                    .mockRejectedValueOnce(new output());

                await expect(
                    service.update(MockProduct.token, updateInput),
                ).rejects.toThrow(output);

                expect(spy).toHaveBeenCalledWith(
                    MockProduct.token,
                    updateInput,
                );
            });

            it('should return BadRequest if product already exists', async () => {
                const output = BadRequestError;

                const spy = jest
                    .spyOn(service, 'update')
                    .mockRejectedValueOnce(new output());

                await expect(
                    service.update(MockProduct.token, updateInput),
                ).rejects.toThrow(output);

                expect(spy).toHaveBeenCalledWith(
                    MockProduct.token,
                    updateInput,
                );
            });
        });

        describe('remove', () => {
            it('should return NotFound if product nothing exists', async () => {
                const output = NotFoundError;

                const spy = jest
                    .spyOn(service, 'remove')
                    .mockRejectedValueOnce(new output());

                await expect(service.remove(MockProduct.token)).rejects.toThrow(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(MockProduct.token);
            });
        });
    });
});
