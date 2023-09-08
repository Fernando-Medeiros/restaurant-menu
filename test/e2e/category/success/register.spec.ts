import { ServerFixture } from 'fixtures/@namespace';
import { CategorySeeder } from 'seeders/category.seeder';
import { CategoryModule } from 'modules/Category/category.module';
import { MockCategory } from 'mocks/mockData';

enum routes {
    base = `/api/v1/categories/`,
}

describe('CategoryController - Register -  (e2e)', () => {
    const server = new ServerFixture();
    const seeder = new CategorySeeder();

    beforeAll(async () => {
        await server.startAsync([CategoryModule]);
    });

    afterAll(async () => {
        await seeder.remove();
        await server.closeAsync();
    });

    describe('Register', () => {
        it('should register a category (POST)', async () => {
            const { name } = MockCategory;

            const resp = await server
                .request()
                .post(routes.base)
                .send({ name });

            expect(resp.statusCode).toBe(201);
            expect(resp.body).toHaveProperty('name', name);

            seeder.data = resp.body;
        });
    });
});
