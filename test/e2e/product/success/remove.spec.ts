import { ServerFixture } from 'fixtures/@namespace';
import { ProductModule } from 'modules/Product/product.module';
import { ProductSeeder } from 'seeders/product.seeder';

enum routes {
    base = `/api/v1/products/`,
}

describe(' - Remove - (e2e)', () => {
    const server = new ServerFixture();
    const seeder = new ProductSeeder();

    beforeAll(async () => {
        await server.startAsync([ProductModule]);
        await seeder.register();
    });

    afterAll(async () => {
        await server.closeAsync();
    });

    it('should remove a product (DELETE)', async () => {
        const { token } = seeder.data;

        const resp = await server.request().delete(routes.base.concat(token));

        expect(resp.statusCode).toBe(204);
    });
});
