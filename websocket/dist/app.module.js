"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const pharmacist_controller_1 = require("./pharmacist/pharmacist.controller");
const category_schema_1 = require("./schemas/category.schema");
const product_schema_1 = require("./schemas/product.schema");
const order_schema_1 = require("./schemas/order.schema");
const product_module_1 = require("./product/product.module");
const category_module_1 = require("./category/category.module");
const order_module_1 = require("./order/order.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://wellcare:wellcare@cluster0.2xezv.mongodb.net/'),
            mongoose_1.MongooseModule.forFeature([
                { name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema },
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
                { name: order_schema_1.Order.name, schema: order_schema_1.OrderSchema },
            ]),
            product_module_1.ProductModule,
            category_module_1.CategoryModule,
            order_module_1.OrderModule,
        ],
        controllers: [pharmacist_controller_1.PharmacistController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map