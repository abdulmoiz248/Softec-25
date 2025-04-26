import { CategoryService } from '../category/category.service';
import { ProductService } from '../product/product.service';
import { OrderService } from '../order/order.service';
export declare class PharmacistController {
    private categoryService;
    private productService;
    private orderService;
    constructor(categoryService: CategoryService, productService: ProductService, orderService: OrderService);
    logout(): {
        success: boolean;
        message: string;
    };
    login(body: {
        email: string;
        password: string;
    }): {
        success: boolean;
        message: string;
    };
    getSalesSummary(): Promise<{
        success: boolean;
        sales: any;
        summary: {
            revenue: {
                value: any;
                trend: any;
            };
            customers: {
                value: any;
                trend: any;
            };
            products: {
                value: any;
                trend: any;
            };
            orders: {
                value: any;
                trend: any;
            };
        };
        topOrders: any;
        topProducts: import("../schemas/product.schema").Product[];
    }>;
    addCategory(body: any): Promise<{
        success: boolean;
        data: import("../schemas/category.schema").Category;
    }>;
    addProduct(body: any): Promise<{
        success: boolean;
        data: import("../schemas/product.schema").Product;
    }>;
    addDiscount(body: any): Promise<{
        success: boolean;
        data: any;
    }>;
    featureProduct(body: {
        productId: string;
    }): Promise<{
        success: boolean;
        data: any;
    }>;
    deleteProduct(id: string): Promise<{
        success: boolean;
    }>;
}
