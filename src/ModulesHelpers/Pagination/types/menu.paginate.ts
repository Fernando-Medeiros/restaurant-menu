import { ApiProperty } from '@nestjs/swagger';
import { Pagination, Payload } from '../pagination';
import { MenuResource } from 'modules/Menu/@namespace';

export class PaginateMenu extends Pagination<MenuResource> {
    @ApiProperty({ isArray: true, type: MenuResource })
    data: MenuResource[];

    constructor(payload: Payload) {
        super(payload);

        this.data = MenuResource.toArray(payload.data);
    }
}
