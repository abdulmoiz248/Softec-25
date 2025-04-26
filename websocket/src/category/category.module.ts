import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category, CategorySchema } from '../schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]), // Register CategoryModel
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService], // Export the CategoryService if needed in other modules
})
export class CategoryModule {}
