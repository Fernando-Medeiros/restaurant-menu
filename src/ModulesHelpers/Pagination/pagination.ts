import { ApiProperty } from '@nestjs/swagger';
import { Metadata } from './metadata';
import { Links } from './links';

export type Payload = {
    data: any[];
    url?: string;
    total?: number | string;
    take?: number | string;
    skip?: number | string;
    order?: string;
    sort?: string;
};

export abstract class Pagination<T> {
    @ApiProperty({ type: Metadata })
    meta: Metadata;
    @ApiProperty({ type: Links })
    links: Links;

    abstract data: T[];

    constructor(payload: Payload) {
        this.meta = new Metadata(payload);
        this.links = new Links(this.meta, payload);
    }
}
