import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ESortBy } from '../Enums/sortby.enum';
import { QueryDTO } from 'modulesHelpers/Common/@namespace';

export class MenuQueryDTO extends QueryDTO {
    @ApiPropertyOptional({
        description: 'Sort By Columns',
        default: 'createdAt',
        enum: ESortBy,
    })
    @IsEnum(ESortBy)
    sort?: ESortBy = ESortBy.createdAt;
}
