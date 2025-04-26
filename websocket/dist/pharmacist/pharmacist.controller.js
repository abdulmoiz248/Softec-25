"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PharmacistController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("../category/category.service");
const product_service_1 = require("../product/product.service");
const order_service_1 = require("../order/order.service");
let PharmacistController = class PharmacistController {
    categoryService;
    productService;
    orderService;
    constructor(categoryService, productService, orderService) {
        this.categoryService = categoryService;
        this.productService = productService;
        this.orderService = orderService;
    }
    logout() {
        return { success: true, message: 'Logged out successfully' };
    }
    login(body) {
        if (body.email === 'pharmacist@comsats' && body.password === '123456') {
            return { success: true, message: 'Logged in successfully' };
        }
        return { success: false, message: 'Invalid email or password' };
    }
    async getSalesSummary() {
        const salesSummary = await this.orderService.getOrderSummary();
        const topOrders = await this.orderService.getTopOrders();
        const topProducts = await this.productService.getTopProducts();
        const salesData = await this.orderService.getSalesChartData();
        return {
            success: true,
            sales: salesData,
            summary: {
                revenue: { value: salesSummary.revenue, trend: salesSummary.revenueTrend },
                customers: { value: salesSummary.customers, trend: salesSummary.customersTrend },
                products: { value: salesSummary.products, trend: salesSummary.productsTrend },
                orders: { value: salesSummary.orders, trend: salesSummary.ordersTrend },
            },
            topOrders: topOrders,
            topProducts: topProducts,
        };
    }
    async addCategory(body) {
        const category = await this.categoryService.createCategory(body);
        return { success: true, data: category };
    }
    async addProduct(body) {
        const product = await this.productService.createProduct(body);
        return { success: true, data: product };
    }
    async addDiscount(body) {
        const discount = await this.productService.addDiscount(body);
        return { success: true, data: discount };
    }
    async featureProduct(body) {
        const featured = await this.productService.featureProduct(body.productId);
        return { success: true, data: featured };
    }
    async deleteProduct(id) {
        await this.productService.deleteProduct(id);
        return { success: true };
    }
};
exports.PharmacistController = PharmacistController;
__decorate([
    (0, common_1.Post)('logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PharmacistController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PharmacistController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('sales'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "getSalesSummary", null);
__decorate([
    (0, common_1.Post)('category'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "addCategory", null);
__decorate([
    (0, common_1.Post)('product'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Post)('discount'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "addDiscount", null);
__decorate([
    (0, common_1.Post)('feature-product'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "featureProduct", null);
__decorate([
    (0, common_1.Delete)('product/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "deleteProduct", null);
exports.PharmacistController = PharmacistController = __decorate([
    (0, common_1.Controller)('pharmacist'),
    __metadata("design:paramtypes", [category_service_1.CategoryService,
        product_service_1.ProductService,
        order_service_1.OrderService])
], PharmacistController);
//# sourceMappingURL=pharmacist.controller.js.map