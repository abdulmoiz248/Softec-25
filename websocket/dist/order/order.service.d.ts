import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';
export declare class OrderService {
    private orderModel;
    constructor(orderModel: Model<OrderDocument>);
    getAllOrders(): Promise<Order[]>;
    getPendingOrders(): Promise<Order[]>;
    getOrderSummary(): Promise<any>;
}
