import { ServerFixture } from 'fixtures/@namespace';
import { ProductModule } from 'modules/Product/product.module';
import { ProductSeeder } from 'seeders/product.seeder';

enum routes {
    base = `/api/v1/products/`,
}

describe('ProductController - Update -  (e2e)', () => {
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

    describe('Update', () => {
        it('should update a product (PATCH)', async () => {
            const { token, description } = seeder.data;

            const resp = await server
                .request()
                .patch(routes.base.concat(token))
                .send({ description });

            expect(resp.statusCode).toBe(204);
        });
    });
});
