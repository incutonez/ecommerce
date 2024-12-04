import { useSyncExternalStore } from "react";
import { CartCheckoutResponseModel } from "@incutonez/ecommerce-spec";
import { CartItemsAPI } from "@/apiConfig.ts";
import { BaseStore } from "@/stores/BaseStore.ts";

class CartCheckout extends BaseStore<CartCheckoutResponseModel> {
	snapshot: CartCheckoutResponseModel = {
		data: [],
		total: 0,
		subTotal: 0,
		tax: 0,
		taxPercent: 0,
		grandTotal: 0,
		shipping: 0,
	};

	async load() {
		this.abort();
		const { data } = await CartItemsAPI.getCartCheckout({
			signal: this.apiController.signal,
		});
		this.setSnapshot(data);
	}
}

export const CartCheckoutStore = new CartCheckout();

export function useCartCheckout() {
	return useSyncExternalStore(CartCheckoutStore.subscribe, CartCheckoutStore.getSnapshot);
}
