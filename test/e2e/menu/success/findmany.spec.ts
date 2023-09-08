import { ServerFixture } from 'fixtures/@namespace';
import { MenuModule } from 'modules/Menu/menu.module';
import { MenuSeeder } from 'seeders/menu.seeder';
import { ProductSeeder } from 'seeders/product.seeder';

enum routes {
    findMany = `/api/v1/menus/find-many`,
}

describe('MenuController - FindMany - (e2e)', () => {
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

    describe('FindMany', () => {
        it('should return a pagination with menus (GET)', async () => {
            const { token } = seeder.data;

            const resp = await server.request().get(routes.findMany);

            expect(resp.statusCode).toBe(200);
            expect(resp.body.data).toBeInstanceOf(Array);
            expect(resp.body.data[0]).toHaveProperty('token', token);
        });
    });
});
