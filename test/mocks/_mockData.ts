import { ProductDTO } from 'modules/Product/DTOs/productDTO';
import { CategoryDTO } from '../../src/Modules/Category/DTOs/categoryDTO';
import { CategoryResource } from 'modules/Category/Resources/category.resource';
import { ProductResource } from 'modules/Product/Resources/product.resource';

export const MockCategory: CategoryDTO = {
    token: '64ed4ffa6d30117c1189f262',
    name: 'Mock Category',
    createdAt: new Date(),
    updatedAt: new Date(),
    productsIDs: [],
};

export const MockProduct: ProductDTO = {
    token: '64ed4ffa6d30117c1189f262',
    name: 'Mock Product',
    description: 'hello world',
    imageUrl: 'www.storage.com/folder/products',
    price: 9.99,
    createdAt: new Date(),
    updatedAt: new Date(),
    categoriesIDs: [],
};

export const MockCategoryResource: CategoryResource = new CategoryResource(
    MockCategory,
);

export const MockProductResource: ProductResource = new ProductResource(
    MockProduct,
);
