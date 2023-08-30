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
    const createDTO: MenuCreateDTO = { ...MockMenu };
    const updateDTO: MenuUpdateDTO = { ...MockMenu };
    const paramDTO: MenuParamDTO = { ...MockMenu };
    const queryDTO = new MenuQueryDTO();

    let prismaService: PrismaService;
    let menuRepository: MenuRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [],
            providers: [PrismaService, MenuRepository],
        }).compile();

        prismaService = moduleRef.get<PrismaService>(PrismaService);
        menuRepository = moduleRef.get<MenuRepository>(MenuRepository);
    });

    describe('Success', () => {
        describe('findMany', () => {
            const result = [MockMenu];

            it('should return an array of menus', async () => {
                jest.spyOn(
                    prismaService.menu,
                    'findMany',
                ).mockResolvedValueOnce(result);

                expect(await menuRepository.findMany(queryDTO)).toBe(result);
            });

            it('should return an empty array', async () => {
                jest.spyOn(
                    prismaService.menu,
                    'findMany',
                ).mockResolvedValueOnce([]);

                expect(await menuRepository.findMany(queryDTO)).toStrictEqual(
                    [],
                );
            });
        });

        describe('findOne', () => {
            const result = MockMenu;

            it('should return a menu', async () => {
                jest.spyOn(
                    prismaService.menu,
                    'findFirst',
                ).mockResolvedValueOnce(result);

                expect(await menuRepository.findOne(paramDTO)).toBe(result);
            });
        });

        describe('register', () => {
            const result = undefined;

            it('should register a menu', async () => {
                jest.spyOn(prismaService.menu, 'create').mockResolvedValueOnce(
                    result,
                );

                expect(await menuRepository.register(createDTO)).toBe(result);
            });
        });

        describe('update', () => {
            const result = undefined;

            it('should update a menu', async () => {
                jest.spyOn(prismaService.menu, 'update').mockResolvedValueOnce(
                    result,
                );

                expect(
                    await menuRepository.update(MockMenu.token, updateDTO),
                ).toBe(result);
            });
        });

        describe('remove', () => {
            const result = undefined;

            it('should remove a menu', async () => {
                jest.spyOn(prismaService.menu, 'delete').mockResolvedValueOnce(
                    result,
                );

                expect(await menuRepository.remove(MockMenu.token)).toBe(
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
                    prismaService.menu,
                    'findFirst',
                ).mockResolvedValueOnce(result);

                expect(await menuRepository.findOne(Object())).toBe(result);
            });
        });
    });
});
