import { ApiProperty } from '@nestjs/swagger';
import { ProductDTO } from '../DTOs/productDTO';

export class ProductResource {
    @ApiProperty()
    token: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    imageUrl: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
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
        return arr.length > 0 ? arr.map((c) => new ProductResource(c)) : [];
    }
}
