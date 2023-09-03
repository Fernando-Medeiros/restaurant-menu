import { ApiProperty } from '@nestjs/swagger';
import { Pagination, Payload } from '../pagination';
import { CategoryResource } from 'modules/Category/@namespace';

export class PaginateCategory extends Pagination<CategoryResource> {
    @ApiProperty({ isArray: true, type: CategoryResource })
    data: CategoryResource[];

    constructor(payload: Payload) {
        super(payload);

        this.data = CategoryResource.toArray(payload.data);
    }
}
