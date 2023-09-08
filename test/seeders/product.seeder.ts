import { Seeder } from 'fixtures/seeder';
import { MockProduct } from 'mocks/mockData';
import { ProductDTO } from 'modules/Product/@namespace';

export class ProductSeeder extends Seeder {
    public data: ProductDTO;

    constructor() {
        super('product');
    }

    async register(): Promise<void> {
        const { name, price, imageUrl, description } = MockProduct;

        return super.register({ name, price, imageUrl, description });
    }
}
