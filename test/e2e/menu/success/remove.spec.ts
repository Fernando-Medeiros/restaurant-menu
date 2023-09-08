import { ServerFixture } from 'fixtures/@namespace';
import { MenuModule } from 'modules/Menu/menu.module';
import { MenuSeeder } from 'seeders/menu.seeder';
import { ProductSeeder } from 'seeders/product.seeder';

enum routes {
    base = `/api/v1/menus/`,
}

describe('MenuController - Remove - (e2e)', () => {
    const server = new ServerFixture();
    const seeder = new MenuSeeder();
    const productSeeder = new ProductSeeder();

    beforeAll(async () => {
        await server.startAsync([MenuModule]);
        await productSeeder.register();
        await seeder.register(productSeeder.data);
    });

    afterAll(async () => {
        await productSeeder.remove();
        await server.closeAsync();
    });

    it('should remove a menu (DELETE)', async () => {
        const { token } = seeder.data;

        const resp = await server.request().delete(routes.base.concat(token));

        expect(resp.statusCode).toBe(204);
    });
});
