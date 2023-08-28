import { CategoryDTO } from '../DTOs/categoryDTO';

export class CategoryResource {
    token: string;
    name: string;
    createdAt: Date;

    constructor(dto: CategoryDTO) {
        this.token = dto.token;
        this.name = dto.name;
        this.createdAt = dto.createdAt;
    }

    static toArray(arr: CategoryDTO[]): CategoryResource[] {
        return arr.length > 0 ? arr.filter((c) => new CategoryResource(c)) : [];
    }
}
