import { ServerFixture } from 'fixtures/@namespace';
import { ProductModule } from 'modules/Product/product.module';
import { ProductSeeder } from 'seeders/product.seeder';

enum routes {
    findMany = `/api/v1/products/find-many`,
}

describe('ProductController - FindMany - (e2e)', () => {
    const server = new ServerFixture();
    const seeder = new ProductSeeder();

    beforeAll(async () => {
        await server.startAsync([ProductModule]);
        await seeder.register();
    });

    afterAll(async () => {
        await seeder.remove();
        await server.closeAsync();
    });

    describe('FindMany', () => {
        it('should return a pagination with products (GET)', async () => {
            const { name } = seeder.data;

            const resp = await server.request().get(routes.findMany);

            expect(resp.statusCode).toBe(200);
            expect(resp.body.data).toBeInstanceOf(Array);
            expect(resp.body.data[0]).toHaveProperty('name', name);
        });
    });
});
