import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CartItemsService } from "src/cart/cart.items.service";
import { CartItemAddEntity, CartItemUpdateEntity } from "src/models/cart.item.entity";
import { CartCheckoutResponseModel, CartResponseModel } from "src/models/responses.entity";

@ApiTags("cartItems")
@Controller("cart-items")
export class CartItemsController {
	constructor(private readonly service: CartItemsService) {
	}

	@Get("")
	async getCart(): Promise<CartResponseModel> {
		return this.service.getCart();
	}

	@Post("")
	@HttpCode(HttpStatus.NO_CONTENT)
	async add(@Body() body: CartItemAddEntity): Promise<void> {
		await this.service.addItem(body);
	}

	@Get("checkout")
	async getCartCheckout(): Promise<CartCheckoutResponseModel> {
		return this.service.getCartCheckout();
	}

	@Delete(":itemId")
	@HttpCode(HttpStatus.NO_CONTENT)
	async remove(@Param("itemId") itemId: string): Promise<void> {
		await this.service.removeItem(itemId);
	}

	@Put(":itemId")
	@HttpCode(HttpStatus.NO_CONTENT)
	async updateCount(@Param("itemId") itemId: string, @Body() body: CartItemUpdateEntity): Promise<void> {
		await this.service.updateItemCount(itemId, body);
	}
}
