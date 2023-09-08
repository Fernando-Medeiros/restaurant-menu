import { ServerFixture } from 'fixtures/@namespace';
import { CategorySeeder } from 'seeders/category.seeder';
import { CategoryModule } from 'modules/Category/category.module';

enum routes {
    findOne = `/api/v1/categories/find-one`,
}

describe('CategoryController - FindOne - (e2e)', () => {
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

    it('should return a category resource by token (GET)', async () => {
        const { token, name } = seeder.data;

        const resp = await server
            .request()
            .get(routes.findOne)
            .query({ token });

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toHaveProperty('name', name);
    });

    it('should return a category resource by name (GET)', async () => {
        const { name } = seeder.data;

        const resp = await server.request().get(routes.findOne).query({ name });

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toHaveProperty('name', name);
    });
});
