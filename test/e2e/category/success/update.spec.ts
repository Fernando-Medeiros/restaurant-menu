import { ServerFixture } from 'fixtures/@namespace';
import { CategorySeeder } from 'seeders/category.seeder';
import { CategoryModule } from 'modules/Category/category.module';

enum routes {
    base = `/api/v1/categories/`,
}

describe('CategoryController - Update -  (e2e)', () => {
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

    describe('Update', () => {
        it('should update a category (PATCH)', async () => {
            const { token, name } = seeder.data;

            const resp = await server
                .request()
                .patch(routes.base.concat(token))
                .send({ name });

            expect(resp.statusCode).toBe(204);
        });
    });
});
