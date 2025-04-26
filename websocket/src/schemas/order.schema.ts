import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  email: string; // Customer's email

  @Prop({ required: true })
  total: number; // Total amount for the order

  @Prop({ required: true, enum: ['Pending', 'Completed', 'Cancelled'] })
  status: string; // Status of the order

  @Prop({ default: Date.now })
  createdAt: Date; // Timestamp when order was placed
}

export const OrderSchema = SchemaFactory.createForClass(Order);
export type OrderDocument = Order & Document;
