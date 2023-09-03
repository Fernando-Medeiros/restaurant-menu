import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { ProductQueryDTO } from './product.queryDTO';

export class ProductFilterDTO extends ProductQueryDTO {
    @ApiPropertyOptional({ description: 'Token' })
    @IsString()
    @IsOptional()
    @Length(24, 24)
    token?: string;

    @ApiPropertyOptional({ description: 'Name' })
    @IsString()
    @IsOptional()
    @Length(3, 100)
    name?: string;
}
