import { ServerFixture } from 'fixtures/@namespace';
import { MockProduct } from 'mocks/mockData';
import { ProductModule } from 'modules/Product/product.module';
import { ProductSeeder } from 'seeders/product.seeder';

enum routes {
    base = `/api/v1/products/`,
}

describe('ProductController - Register -  (e2e)', () => {
    const server = new ServerFixture();
    const seeder = new ProductSeeder();

    beforeAll(async () => {
        await server.startAsync([ProductModule]);
    });

    afterAll(async () => {
        await seeder.remove();
        await server.closeAsync();
    });

    describe('Register', () => {
        it('should register a product (POST)', async () => {
            const { name, price, description, imageUrl } = MockProduct;

            const resp = await server
                .request()
                .post(routes.base)
                .send({ name, price, description, imageUrl });

            expect(resp.statusCode).toBe(201);
            expect(resp.body).toHaveProperty('name', name);

            seeder.data = resp.body;
        });
    });
});
