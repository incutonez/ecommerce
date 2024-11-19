import { Module } from "@nestjs/common";
import { CartItemsController } from "src/cart/cart.items.controller";
import { CartItemsMapper } from "src/cart/cart.items.mapper";
import { CartItemsService } from "src/cart/cart.items.service";
import { ProductsModule } from "src/products/products.module";

@Module({
	controllers: [CartItemsController],
	providers: [CartItemsService, CartItemsMapper],
	imports: [ProductsModule],
})
export class CartItemsModule {
}
