import { ServerFixture } from 'fixtures/@namespace';
import { CategorySeeder } from 'seeders/category.seeder';
import { CategoryModule } from 'modules/Category/category.module';

enum routes {
    findMany = `/api/v1/categories/find-many`,
}

describe('CategoryController - FindMany - (e2e)', () => {
    const server = new ServerFixture();
    const seeder = new CategorySeeder();

    beforeAll(async () => {
        await server.startAsync([CategoryModule]);
        await seeder.register();
    });

    afterAll(async () => {
        await seeder.remove();
        await server.closeAsync();
    });

    describe('FindMany', () => {
        it('should return a pagination with categories (GET)', async () => {
            const { name } = seeder.data;

            const resp = await server.request().get(routes.findMany);

            expect(resp.statusCode).toBe(200);
            expect(resp.body.data).toBeInstanceOf(Array);
            expect(resp.body.data[0]).toHaveProperty('name', name);
        });
    });
});
