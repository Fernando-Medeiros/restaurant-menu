import { Product } from '@prisma/client';
import { CategoryDTO } from 'modules/Category/@namespace';

export class ProductDTO implements Product {
    token: string;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;

    categoriesIDs: string[];
    categories?: CategoryDTO[];
}
