import { Test } from '@nestjs/testing';
import { PrismaService } from 'modulesHelpers/Prisma/prisma.service';
import {
    MenuCreateDTO,
    MenuParamDTO,
    MenuQueryDTO,
    MenuRepository,
    MenuUpdateDTO,
} from 'modules/Menu/@namespace';
import { MockMenu } from 'mocks/mockData';

describe('Unit - MenuRepository', () => {
    const createInput: MenuCreateDTO = { ...MockMenu };
    const updateInput: MenuUpdateDTO = { ...MockMenu };
    const paramInput: MenuParamDTO = { ...MockMenu };
    const queryInput = new MenuQueryDTO();

    let repository: MenuRepository;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [],
            providers: [PrismaService, MenuRepository],
        }).compile();

        repository = moduleRef.get<MenuRepository>(MenuRepository);
    });

    describe('Success', () => {
        describe('findMany', () => {
            it('should return an array of menus', async () => {
                const output = { total: 2, data: [MockMenu, MockMenu] };

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
            it('should return a menu', async () => {
                const output = MockMenu;

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
            it('should register a menu', async () => {
                const output = MockMenu;

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
            it('should update a menu', async () => {
                const output = undefined;

                const spy = jest
                    .spyOn(repository, 'update')
                    .mockResolvedValueOnce(output);

                expect(
                    await repository.update(MockMenu.token, updateInput),
                ).toStrictEqual(output);

                expect(spy).toHaveBeenCalledWith(MockMenu.token, updateInput);
            });
        });

        describe('remove', () => {
            it('should remove a menu', async () => {
                const output = undefined;

                const spy = jest
                    .spyOn(repository, 'remove')
                    .mockResolvedValueOnce(output);

                expect(await repository.remove(MockMenu.token)).toStrictEqual(
                    output,
                );

                expect(spy).toHaveBeenCalledWith(MockMenu.token);
            });
        });
    });
});
