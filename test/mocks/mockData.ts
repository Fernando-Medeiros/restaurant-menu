import { CategoryDTO, CategoryResource } from 'modules/Category/@namespace';
import { ProductDTO, ProductResource } from 'modules/Product/@namespace';

export const MockCategory: CategoryDTO = {
    token: '64ed4ffa6d30117c1189f262',
    name: 'Mock Category',
    createdAt: new Date(),
    updatedAt: new Date(),
    productsIDs: [] as string[],
    products: [] as ProductDTO[],
};

export const MockProduct: ProductDTO = {
    token: '64ed4ffa6d30117c1189f262',
    name: 'Mock Product',
    description: 'hello world',
    imageUrl: 'www.storage.com/folder/products',
    price: 9.99,
    createdAt: new Date(),
    updatedAt: new Date(),
    categoriesIDs: [] as string[],
    categories: [] as CategoryDTO[],
};

export const MockCategoryResource: CategoryResource = new CategoryResource(
    MockCategory,
);

export const MockProductResource: ProductResource = new ProductResource(
    MockProduct,
);
