import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
export declare class ProductService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    getTopProducts(): Promise<Product[]>;
    createProduct(productData: any): Promise<Product>;
    updateDiscount(productId: string, discountPercent: number, validTill: Date): Promise<Product | null>;
    updateFeatured(productId: string): Promise<Product | null>;
    deleteProduct(productId: string): Promise<Product | null>;
}
