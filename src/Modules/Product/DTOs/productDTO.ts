import { Product } from '@prisma/client';

export class ProductDTO implements Product {
    token: string;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    categoriesIDs: string[];
}
