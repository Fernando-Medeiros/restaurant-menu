import { ApiProperty } from '@nestjs/swagger';
import { Pagination, Payload } from '../pagination';
import { ProductResource } from 'modules/Product/@namespace';

export class PaginateProduct extends Pagination<ProductResource> {
    @ApiProperty({ isArray: true, type: ProductResource })
    data: ProductResource[];

    constructor(payload: Payload) {
        super(payload);

        this.data = ProductResource.toArray(payload.data);
    }
}
