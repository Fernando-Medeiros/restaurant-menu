import { Category } from '@prisma/client';
import { ProductDTO } from 'modules/Product/@namespace';

export class CategoryDTO implements Category {
    token: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;

    productsIDs: string[];
    products?: ProductDTO[];
}
