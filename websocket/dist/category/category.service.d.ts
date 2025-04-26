import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
export declare class CategoryService {
    private categoryModel;
    constructor(categoryModel: Model<CategoryDocument>);
    createCategory(name: string, description: string): Promise<Category>;
}
