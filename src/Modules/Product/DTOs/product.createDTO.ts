import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
    Max,
    Min,
} from 'class-validator';

export class ProductCreateDTO {
    @ApiProperty({ description: 'Product Name' })
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    name: string;

    @ApiProperty({ description: 'Price' })
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @Min(1)
    @Max(999)
    price: number;

    @ApiProperty({ description: 'Image URL' })
    @IsString()
    @IsNotEmpty()
    @Length(3, 255)
    imageUrl: string;

    @ApiProperty({ description: 'Description' })
    @IsString()
    @IsNotEmpty()
    @Length(3, 255)
    description: string;
}
