import { useSyncExternalStore } from "react";
import { CartResponseModel } from "@incutonez/ecommerce-spec";
import { CartItemsAPI } from "@/apiConfig.ts";
import { ExtStoreSubParam } from "@/types.ts";

let listeners: ExtStoreSubParam[] = [];
let snapshot: CartResponseModel = {
	data: [],
	total: 0,
};

export async function loadCartCount() {
	const { data } = await CartItemsAPI.getCart();
	snapshot = data;
	publishCartTotal();
	return snapshot;
}

export async function cartAdd(productId: string) {
	await CartItemsAPI.add({
		productId,
	});
	await loadCartCount();
}

export async function cartRemove(productId: string) {
	await CartItemsAPI.remove(productId);
	await loadCartCount();
}

export function subscribe(subscriber: ExtStoreSubParam) {
	listeners = [...listeners, subscriber];
	return () => {
		listeners = listeners.filter((listener) => listener !== subscriber);
	};
}

export function getSnapshot() {
	return snapshot;
}

export function useCart() {
	return useSyncExternalStore(subscribe, getSnapshot);
}

export function useCartItemTotal(itemId: string) {
	const { data = [] } = useCart();
	return data?.find((item) => item.productId === itemId)?.count ?? 0;
}

function publishCartTotal() {
	for (const listener of listeners) {
		listener();
	}
}
