import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CategoryCreateDTO {
    @ApiProperty({ description: 'Name' })
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    name: string;
}
