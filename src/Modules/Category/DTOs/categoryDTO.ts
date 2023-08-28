import { Category } from '@prisma/client';

export class CategoryDTO implements Category {
    token: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    productsIDs: string[];
}
