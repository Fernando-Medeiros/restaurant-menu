import { ServerFixture } from 'fixtures/@namespace';
import { MenuModule } from 'modules/Menu/menu.module';
import { MenuSeeder } from 'seeders/menu.seeder';
import { ProductSeeder } from 'seeders/product.seeder';

enum routes {
    findOne = `/api/v1/menus/find-one`,
}

describe('MenuController - FindOne - (e2e)', () => {
    const server = new ServerFixture();
    const seeder = new MenuSeeder();
    const productSeeder = new ProductSeeder();

    beforeAll(async () => {
        await server.startAsync([MenuModule]);
        await productSeeder.register();
        await seeder.register(productSeeder.data);
    });

    afterAll(async () => {
        await seeder.remove();
        await productSeeder.remove();
        await server.closeAsync();
    });

    it('should return a menu resource by token (GET)', async () => {
        const { token } = seeder.data;

        const resp = await server
            .request()
            .get(routes.findOne)
            .query({ token });

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toHaveProperty('token', token);
    });
});
