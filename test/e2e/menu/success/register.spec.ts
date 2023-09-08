import { ServerFixture } from 'fixtures/@namespace';
import { MockMenu } from 'mocks/mockData';
import { MenuModule } from 'modules/Menu/menu.module';
import { MenuSeeder } from 'seeders/menu.seeder';
import { ProductSeeder } from 'seeders/product.seeder';

enum routes {
    base = `/api/v1/menus/`,
}

describe('MenuController - Register -  (e2e)', () => {
    const server = new ServerFixture();
    const seeder = new MenuSeeder();
    const productSeeder = new ProductSeeder();

    beforeAll(async () => {
        await server.startAsync([MenuModule]);
        await productSeeder.register();
    });

    afterAll(async () => {
        await seeder.remove();
        await productSeeder.remove();
        await server.closeAsync();
    });

    describe('Register', () => {
        it('should register a menu (POST)', async () => {
            const { period } = MockMenu;

            const productToken = productSeeder.data.token;

            const resp = await server
                .request()
                .post(routes.base)
                .send({ period, productToken });

            expect(resp.statusCode).toBe(201);
            expect(resp.body).toHaveProperty('period', period);

            seeder.data = resp.body;
        });
    });
});
