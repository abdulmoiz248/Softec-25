import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { ProductService } from '../product/product.service';
import { OrderService } from '../order/order.service';

@Controller('pharmacist')
export class PharmacistController {
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private orderService: OrderService,
  ) {}

  @Post('logout')
  logout() {
    return { success: true, message: 'Logged out successfully' };
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    if (body.email === 'pharmacist@comsats' && body.password === '123456') {
      return { success: true, message: 'Logged in successfully' };
    }
    return { success: false, message: 'Invalid email or password' };
  }

  @Get('sales')
  async getSalesSummary() {
    const sales = await this.orderService.getOrderSummary();
    const topOrders = await this.orderService.getAllOrders();
    const topProducts = await this.productService.getTopProducts();
    return {
      success: true,
      sales: { labels: [], datasets: [] }, // Customize your sales chart data
      summary: {
        revenue: { value: sales.revenue, trend: 0 },
        customers: { value: sales.customers, trend: 0 },
        products: { value: topProducts.length, trend: 0 },
        orders: { value: sales.orders, trend: 0 },
      },
      topOrders: topOrders.slice(0, 5),
      topProducts: topProducts.map(product => ({
        name: product.name,
        sales: product.sales,
        revenue: product.price * product.sales,
      })),
    };
  }

  @Post('category')
  async addCategory(@Body() body: { name: string; description: string }) {
    return this.categoryService.createCategory(body.name, body.description);
  }

  @Post('product')
  async addProduct(@Body() body: any) {
    return this.productService.createProduct(body);
  }

  @Post('discount')
  async addDiscount(@Body() body: { productId: string; discountPercent: number; validTill: string }) {
    return this.productService.updateDiscount(body.productId, body.discountPercent, new Date(body.validTill));
  }

  @Post('feature-product')
  async featureProduct(@Body() body: { productId: string }) {
    return this.productService.updateFeatured(body.productId);
  }

  @Delete('product/:productId')
  async deleteProduct(@Param('productId') productId: string) {
    return this.productService.deleteProduct(productId);
  }

  @Get('order/pending')
  async getPendingOrders() {
    return this.orderService.getPendingOrders();
  }

  @Get('order/all')
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }
}
