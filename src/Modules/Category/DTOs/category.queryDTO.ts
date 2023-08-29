import { IsEnum, IsNumberString, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { OrderBy } from '../Enum/orderby';
import { SortBy } from '../Enum/sortby';

export class CategoryQueryDTO {
    @ApiPropertyOptional({
        description: 'Take',
        default: 10,
        minimum: 1,
        maximum: 99,
    })
    @Length(0, 2, { message: 'must be greater than 1 and less than 99' })
    @IsNumberString()
    take?: string = '10';

    @ApiPropertyOptional({
        description: 'Skip',
        default: 0,
        minimum: 0,
        maximum: 99,
    })
    @Length(0, 2, { message: 'must be greater than 0 and less than 99' })
    @IsNumberString()
    skip?: string = '0';

    @ApiPropertyOptional({
        description: 'Order By',
        default: 'asc',
        enum: OrderBy,
    })
    @IsEnum(OrderBy)
    order?: OrderBy = OrderBy.asc;

    @ApiPropertyOptional({
        description: 'Sort By Columns',
        default: 'name',
        enum: SortBy,
    })
    @IsEnum(SortBy)
    sort?: SortBy = SortBy.name;
}
