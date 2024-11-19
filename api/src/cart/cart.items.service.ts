import { faker } from "@faker-js/faker";
import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { col, fn } from "sequelize";
import { CartItemsMapper } from "src/cart/cart.items.mapper";
import { CartItemModel } from "src/db/models/CartItemModel";
import { CartItemAddEntity, CartItemUpdateEntity } from "src/models/cart.item.entity";
import { toDecimal } from "src/utils";

@Injectable({
	scope: Scope.REQUEST,
})
export class CartItemsService {
	// TODOJEF: ABSTRACT OUT REQUEST, SO WE CAN HAVE A GETTER
	constructor(private mapper: CartItemsMapper, @Inject(REQUEST) private readonly request: Request) {
	}

	async addItem(model: CartItemAddEntity) {
		model.userId ??= this.request.user.sub;
		await CartItemModel.create(this.mapper.addViewModelToModel(model));
	}

	async removeItem(productId: string) {
		/**
		 * The cart_items table is just a mapping of userId and productId, so we don't really care which one we
		 * delete, but we only want to remove 1
		 */
		const found = await CartItemModel.findOne({
			where: {
				user_id: this.request.user.sub,
				product_id: productId,
			},
		});
		if (found) {
			await found.destroy();
		}
	}

	async updateItemCount(productId: string, { total }: CartItemUpdateEntity) {
		const { rows, count } = await CartItemModel.findAndCountAll({
			attributes: ["product_id"],
			where: {
				user_id: this.request.user.sub,
				product_id: productId,
			},
		});
		const difference = count - total;
		// Nothing has changed
		if (difference === 0) {
			return;
		}
		// We want to delete the difference
		else if (difference > 0) {
			const promises: Promise<void>[] = [];
			for (let i = 0; i < difference; i++) {
				const item = rows[i];
				if (item) {
					promises.push(item.destroy());
				}
			}
			await Promise.all(promises);
		}
		// We want to add the difference
		else {
			const promises: Promise<CartItemModel>[] = [];
			for (let i = 0; i < Math.abs(difference); i++) {
				promises.push(CartItemModel.create({
					product_id: productId,
					user_id: this.request.user.sub,
				}));
			}
			await Promise.all(promises);
		}
	}

	async getCart() {
		const { count, rows } = await CartItemModel.findAndCountAll({
			/**
			 * We want to count the number of similar products and get that in our response, as it's more
			 * efficient to count at the DB level than post array manipulation
			 */
			distinct: true,
			attributes: ["product_id", "user_id", [fn("COUNT", fn("DISTINCT", col("CartItemModel.id"))), "total"]],
			group: [col("product_id")],
			where: {
				user_id: this.request.user.sub,
			},
		});
		return {
			data: rows.map((record) => this.mapper.modelToViewModel(record)),
			total: count.reduce((total, current) => current.count + total, 0),
		};
	}

	async getCartCheckout() {
		let subTotal = 0;
		const shipping = faker.number.float({
			min: 1,
			max: 100,
			fractionDigits: 2,
		});
		const { count, rows } = await CartItemModel.findAndCountAll({
			/**
			 * We want to count the number of similar products and get that in our response, as it's more
			 * efficient to count at the DB level than post array manipulation
			 */
			distinct: true,
			attributes: ["CartItemModel.*", [fn("COUNT", fn("DISTINCT", col("CartItemModel.id"))), "total"]],
			group: [col("CartItemModel.product_id")],
			where: {
				user_id: this.request.user.sub,
			},
			include: [{
				all: true,
				nested: true,
			}],
		});
		const data = rows.map((record) => {
			const response = this.mapper.modelToCheckoutViewModel(record);
			subTotal += response.subTotal;
			return response;
		});
		const taxPercent = faker.number.float({
			min: 0,
			max: 1,
			fractionDigits: 2,
		});
		const tax = subTotal * taxPercent;
		return {
			data,
			taxPercent,
			shipping,
			tax: toDecimal(tax),
			subTotal: toDecimal(subTotal),
			grandTotal: toDecimal(subTotal + tax + shipping),
			total: count.reduce((total, current) => current.count + total, 0),
		};
	}
}
