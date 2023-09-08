import { ServerFixture } from 'fixtures/@namespace';
import { ProductModule } from 'modules/Product/product.module';
import { ProductSeeder } from 'seeders/product.seeder';

enum routes {
    findOne = `/api/v1/products/find-one`,
}

describe('ProductController - FindOne - (e2e)', () => {
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

    it('should return a product resource by token (GET)', async () => {
        const { token, name } = seeder.data;

        const resp = await server
            .request()
            .get(routes.findOne)
            .query({ token });

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toHaveProperty('name', name);
    });

    it('should return a product resource by name (GET)', async () => {
        const { name } = seeder.data;

        const resp = await server.request().get(routes.findOne).query({ name });

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toHaveProperty('name', name);
    });
});
