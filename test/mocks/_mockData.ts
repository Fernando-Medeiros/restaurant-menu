import { ProductDTO } from 'modules/Product/DTOs/productDTO';
import { CategoryDTO } from '../../src/Modules/Category/DTOs/categoryDTO';

export const MockCategory: CategoryDTO = {
    token: '0000000000000',
    name: 'Mock Category',
    createdAt: new Date(),
    updatedAt: new Date(),
    productsIDs: [],
};

export const MockProduct: ProductDTO = {
    token: '0000000000000',
    name: 'Mock Product',
    description: 'hello world',
    imageUrl: 'www.storage.com/folder/products',
    price: 9.99,
    createdAt: new Date(),
    updatedAt: new Date(),
    categoriesIDs: [],
};
