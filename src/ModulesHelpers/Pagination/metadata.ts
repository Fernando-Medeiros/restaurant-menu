import { ApiProperty } from '@nestjs/swagger';
import { Payload } from './pagination';

export class Metadata {
    @ApiProperty({ title: 'Total records' })
    total: number;
    @ApiProperty({ title: 'Total records in the data' })
    count: number;
    @ApiProperty({ title: 'Skip records' })
    skip: number;
    @ApiProperty({ title: 'Take records per page' })
    take: number;
    @ApiProperty({ title: 'Current page' })
    page: number;
    @ApiProperty({ title: 'Total  pages' })
    pages: number;
    @ApiProperty({ title: 'Order By' })
    order: string;
    @ApiProperty({ title: 'Sort By Column' })
    sort: string;

    constructor(payload: Payload) {
        this.total = +payload.total;
        this.skip = +payload.skip;
        this.take = +payload.take;
        this.sort = payload.sort;
        this.order = payload.order;
        this.count = payload.data.length;
        this.pages = this.computeTotalPages();
        this.page = this.computeCurrentPage();
    }

    private computeTotalPages(): number {
        return Math.ceil(this.total / this.take) || 1;
    }

    private computeCurrentPage(): number {
        const current = Math.floor(this.skip / this.take + 1) || 1;

        return current < this.pages ? current : this.pages;
    }
}
