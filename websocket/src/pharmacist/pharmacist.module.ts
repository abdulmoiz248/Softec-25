import { Module } from '@nestjs/common';
import { PharmacistController } from './pharmacist.controller';
import { ProductModule } from '../product/product.module'; // Import ProductModule
import { CategoryModule } from 'src/category/category.module';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [ProductModule,CategoryModule,OrderModule], 
  controllers: [PharmacistController],
})
export class PharmacistModule {}
