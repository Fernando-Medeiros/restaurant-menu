import {
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
    Max,
    Min,
} from 'class-validator';

export class ProductCreateDTO {
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    name: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @Min(1)
    @Max(999)
    price: number;

    @IsString()
    @IsNotEmpty()
    @Length(3, 255)
    imageUrl: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 255)
    description: string;
}
