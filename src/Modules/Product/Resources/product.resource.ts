import { ApiProperty } from '@nestjs/swagger';
import { CategoryResourceToProducts } from 'modules/Category/@namespace';
import { ProductDTO } from 'modules/Product/@namespace';

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

    @ApiProperty({ isArray: true, type: CategoryResourceToProducts })
    categories: CategoryResourceToProducts[];

    @ApiProperty()
    createdAt: Date;

    constructor(dto: ProductDTO) {
        this.token = dto.token;
        this.name = dto.name;
        this.price = dto.price;
        this.imageUrl = dto.imageUrl;
        this.description = dto.description;
        this.createdAt = dto.createdAt;
        this.categories = CategoryResourceToProducts.toArray(dto.categories);
    }

    static toArray(arr: ProductDTO[]): ProductResource[] {
        return arr?.length > 0 ? arr.map((c) => new ProductResource(c)) : [];
    }
}
