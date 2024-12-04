import { useSyncExternalStore } from "react";
import { CartResponseModel } from "@incutonez/ecommerce-spec";
import { CartItemsAPI } from "@/apiConfig.ts";
import { BaseStore } from "@/stores/BaseStore.ts";

class CartTotal extends BaseStore<CartResponseModel> {
	snapshot: CartResponseModel = {
		data: [],
		total: 0,
	};

	async loadCartCount() {
		this.abort();
		const { data } = await CartItemsAPI.getCart({
			signal: this.apiController.signal,
		});
		this.setSnapshot(data);
	}

	async cartAdd(productId: string) {
		await CartItemsAPI.add({
			productId,
		});
		await this.loadCartCount();
	}

	async cartRemove(productId: string) {
		await CartItemsAPI.remove(productId);
		await this.loadCartCount();
	}

	async cartUpdateCount(productId: string, total: number) {
		await CartItemsAPI.updateCount(productId, {
			total,
		});
		await this.loadCartCount();
	}
}

export const CartTotalStore = new CartTotal();

export function useCart() {
	return useSyncExternalStore(CartTotalStore.subscribe, CartTotalStore.getSnapshot);
}

export function useCartItemTotal(itemId: string) {
	const { data = [] } = useCart();
	return data?.find((item) => item.productId === itemId)?.count ?? 0;
}
