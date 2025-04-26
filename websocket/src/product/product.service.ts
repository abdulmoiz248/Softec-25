import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async getTopProducts(): Promise<Product[]> {
    // Implement logic to fetch top products (e.g., top 5 products)
    return this.productModel.find().sort({ rating: -1 }).limit(5).exec(); // Sorting by rating as an example
  }

  async createProduct(productData: any): Promise<Product> {
    const newProduct = new this.productModel(productData);
    return newProduct.save();
  }

  async updateDiscount(productId: string, discountPercent: number, validTill: Date): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(
      productId,
      { discountPercent, validTill },
      { new: true },
    );
  }

  async updateFeatured(productId: string): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(
      productId,
      { featured: true },
      { new: true },
    );
  }

  async deleteProduct(productId: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(productId);
  }
}
