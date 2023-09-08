import { Period } from '@prisma/client';
import { ServerFixture } from 'fixtures/@namespace';
import { MenuModule } from 'modules/Menu/menu.module';
import { MenuSeeder } from 'seeders/menu.seeder';
import { ProductSeeder } from 'seeders/product.seeder';

enum routes {
    base = `/api/v1/menus/`,
}

describe('MenuController - Update -  (e2e)', () => {
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

    describe('Update', () => {
        it('should update a menu (PATCH)', async () => {
            const { token, productToken } = seeder.data;

            const resp = await server
                .request()
                .put(routes.base.concat(token))
                .send({ productToken, period: Period.nighttime });

            expect(resp.statusCode).toBe(204);
        });
    });
});
