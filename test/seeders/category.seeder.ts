import { Seeder } from 'fixtures/seeder';
import { MockCategory } from 'mocks/mockData';
import { CategoryDTO } from 'modules/Category/@namespace';

export class CategorySeeder extends Seeder {
    public data: CategoryDTO;

    constructor() {
        super('category');
    }

    async register(): Promise<void> {
        return super.register({ name: MockCategory.name });
    }
}
