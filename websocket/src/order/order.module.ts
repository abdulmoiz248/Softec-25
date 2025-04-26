import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from '../schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), // Register Order schema
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService], // Export OrderService if needed in other modules
})
export class OrderModule {}
