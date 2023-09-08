import { ServerFixture } from 'fixtures/@namespace';
import { CategorySeeder } from 'seeders/category.seeder';
import { CategoryModule } from 'modules/Category/category.module';

enum routes {
    findProducts = `/api/v1/categories/products`,
}

describe('CategoryController - FindProducts -  (e2e)', () => {
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

    describe('FindProducts by category', () => {
        it('should return a pagination with products resources (find by token) (GET)', async () => {
            const { token } = seeder.data;

            const resp = await server
                .request()
                .get(routes.findProducts)
                .query({ token });

            expect(resp.statusCode).toBe(200);
            expect(resp.body.data).toBeInstanceOf(Array);
        });

        it('should return a pagination with products resources (find by name) (GET)', async () => {
            const { name } = seeder.data;

            const resp = await server
                .request()
                .get(routes.findProducts)
                .query({ name });

            expect(resp.statusCode).toBe(200);
            expect(resp.body.data).toBeInstanceOf(Array);
        });
    });
});
