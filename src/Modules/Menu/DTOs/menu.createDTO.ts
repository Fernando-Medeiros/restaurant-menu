import { Period } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNotEmpty, IsEnum } from 'class-validator';

export class MenuCreateDTO {
    @ApiProperty({ description: 'Product Token' })
    @IsString()
    @IsNotEmpty()
    @Length(24, 24)
    productToken: string;

    @ApiProperty({
        description: 'Periods to register',
        enum: Period,
    })
    @IsNotEmpty()
    @IsEnum(Period)
    period: Period;
}
