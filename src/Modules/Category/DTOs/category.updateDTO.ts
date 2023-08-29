import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CategoryUpdateDTO {
    @ApiProperty({ description: 'Name' })
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    name: string;
}
