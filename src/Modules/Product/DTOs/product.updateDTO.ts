import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    Length,
    IsNumber,
    Min,
    Max,
    IsOptional,
} from 'class-validator';

export class ProductUpdateDTO {
    @ApiPropertyOptional({ description: 'Product Name' })
    @IsOptional()
    @IsString()
    @Length(3, 100)
    name: string;

    @ApiPropertyOptional({ description: 'Price' })
    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(1)
    @Max(999)
    price: number;

    @ApiPropertyOptional({ description: 'Image URL' })
    @IsOptional()
    @IsString()
    @Length(3, 255)
    imageUrl: string;

    @ApiPropertyOptional({ description: 'Description' })
    @IsOptional()
    @IsString()
    @Length(3, 255)
    description: string;
}
