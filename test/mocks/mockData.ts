import { CategoryDTO, CategoryResource } from 'modules/Category/@namespace';
import { ProductDTO, ProductResource } from 'modules/Product/@namespace';
import { MenuDTO, MenuResource } from 'modules/Menu/@namespace';

export const MockCategory: CategoryDTO = {
    token: '64ed4ffa6d30188c1189f262',
    name: 'Mock Category',
    createdAt: new Date(),
    updatedAt: new Date(),
    productsIDs: [],
    products: [],
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
    categories: [],
};
export const MockMenu: MenuDTO = {
    token: '64ed4ffa6d30117c1184fd62',
    productToken: MockProduct.token,
    period: 'daytime',
    createdAt: new Date(),
    updatedAt: new Date(),
    product: MockProduct,
};

export const MockCategoryResource = new CategoryResource(MockCategory);
export const MockProductResource = new ProductResource(MockProduct);
export const MockMenuResource = new MenuResource(MockMenu);
