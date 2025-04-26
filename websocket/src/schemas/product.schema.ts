import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  sales: number;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: 0 })
  discountPercent: number;

  @Prop({ default: null })
  validTill: Date;

  @Prop({ required: true })
  categoryId: string; // Reference to Category
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export type ProductDocument = Product & Document;
