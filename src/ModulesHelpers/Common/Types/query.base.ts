import { IsEnum, IsNumberString, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { EOrderBy } from '../Enums/orderby.enum';

export abstract class QueryDTO {
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
        enum: EOrderBy,
    })
    @IsEnum(EOrderBy)
    order?: EOrderBy = EOrderBy.asc;

    abstract sort?: any;

    public extractResolvedFilters(): {
        take: number;
        skip: number;
        orderBy: Record<string, EOrderBy>;
    } {
        return {
            ...(this.sort && { orderBy: { [this.sort]: this.order } }),
            take: Math.abs(+this.take),
            skip: Math.abs(+this.skip),
        };
    }
}
