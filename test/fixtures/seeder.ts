import { PrismaClient } from '@prisma/client';

export abstract class Seeder {
    private static readonly context = new PrismaClient();

    private readonly entity: string;

    abstract data: object;

    constructor(opt: 'category' | 'product' | 'menu') {
        this.entity = opt;
    }

    async register(data: object): Promise<void> {
        this.data = await Seeder.context[this.entity].create({ data });
    }

    async remove(): Promise<void> {
        const { token } = Object(this.data);

        await Seeder.context[this.entity].delete({ where: { token } });
    }
}
