import { ApiProperty } from '@nestjs/swagger';
import { CategoryDTO } from 'modules/Category/@namespace';

export class CategoryResource {
    @ApiProperty()
    token: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    createdAt: Date;

    constructor(dto: CategoryDTO) {
        this.token = dto.token;
        this.name = dto.name;
        this.createdAt = dto.createdAt;
    }

    static toArray(arr: CategoryDTO[]): CategoryResource[] {
        return arr.length > 0 ? arr.map((c) => new CategoryResource(c)) : [];
    }
}
