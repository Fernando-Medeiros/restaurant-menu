import { Period } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class MenuUpdateDTO {
    @ApiProperty({ description: 'Product Token' })
    @IsString()
    @IsNotEmpty()
    @Length(24, 24)
    productToken: string;

    @ApiProperty({
        description: 'Periods to update',
        enum: Period,
    })
    @IsNotEmpty()
    @IsEnum(Period)
    period: Period;
}
