import { ProductDTO } from '../DTOs/productDTO';

export class ProductResource {
    token: string;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    createdAt: Date;

    constructor(dto: ProductDTO) {
        this.token = dto.token;
        this.name = dto.name;
        this.price = dto.price;
        this.imageUrl = dto.imageUrl;
        this.description = dto.description;
        this.createdAt = dto.createdAt;
    }

    static toArray(arr: ProductDTO[]): ProductResource[] {
        return arr.length > 0 ? arr.filter((c) => new ProductResource(c)) : [];
    }
}
