import { ServerFixture } from 'fixtures/@namespace';
import { CategorySeeder } from 'seeders/category.seeder';
import { CategoryModule } from 'modules/Category/category.module';

enum routes {
    base = `/api/v1/categories/`,
}

describe('CategoryController - Remove - (e2e)', () => {
    const server = new ServerFixture();
    const seeder = new CategorySeeder();

    beforeAll(async () => {
        await server.startAsync([CategoryModule]);
        await seeder.register();
    });

    afterAll(async () => {
        await server.closeAsync();
    });

    it('should remove a category (DELETE)', async () => {
        const { token } = seeder.data;

        const resp = await server.request().delete(routes.base.concat(token));

        expect(resp.statusCode).toBe(204);
    });
});
