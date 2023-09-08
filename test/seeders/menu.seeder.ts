import { Seeder } from 'fixtures/seeder';
import { MockMenu } from 'mocks/mockData';
import { MenuDTO } from 'modules/Menu/@namespace';

export class MenuSeeder extends Seeder {
    public data: MenuDTO;

    constructor() {
        super('menu');
    }

    async register(data: object): Promise<void> {
        const { period } = MockMenu;

        const { token } = Object(data);

        return super.register({ period, productToken: token });
    }
}
