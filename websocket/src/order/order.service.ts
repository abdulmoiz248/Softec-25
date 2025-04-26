import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.find();
  }

  async getPendingOrders(): Promise<Order[]> {
    return this.orderModel.find({ status: 'Pending' });
  }

  async getOrderSummary(): Promise<any> {
    const orders = await this.orderModel.find();
    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
    const totalOrders = orders.length;
    const customers = new Set(orders.map(order => order.email)).size;

    return { revenue: totalRevenue, orders: totalOrders, customers };
  }
}
