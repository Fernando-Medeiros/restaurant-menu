import { ApiProperty } from '@nestjs/swagger';
import { Metadata } from './metadata';
import { Payload } from './pagination';

export class Links {
    @ApiProperty({ title: 'Next page', example: 'url/?skip=10&take=10' })
    next: string;
    @ApiProperty({ title: 'Previous page', example: 'url/?skip=0&take=10' })
    prev: string;
    @ApiProperty({ title: 'First page', example: 'url/?skip=0&take=10' })
    first: string;
    @ApiProperty({ title: 'Last page', example: 'url/?skip=90&take=10' })
    last: string;

    constructor(meta: Metadata, payload: Payload) {
        this.first = this.toPath(0, meta.take, payload.url);

        this.next = this.toPath(this.computeNext(meta), meta.take, payload.url);

        this.prev = this.toPath(this.computePrev(meta), meta.take, payload.url);

        this.last = this.toPath(this.computeLast(meta), meta.take, payload.url);
    }

    private computeNext({ page, pages, take }: Metadata): number {
        return page + 1 > pages ? (pages - 1) * take : page * take;
    }

    private computePrev({ page, take }: Metadata): number {
        return page - 1 < 1 ? 0 : (page - 2) * take;
    }

    private computeLast({ pages, take }: Metadata): number {
        return (pages - 1) * take;
    }

    private toPath(skip: number, take: number, url: string): string {
        const [baseUrl] = url.split('?');

        return `${baseUrl}?skip=${skip}&take=${take}`;
    }
}
