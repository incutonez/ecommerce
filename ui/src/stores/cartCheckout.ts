import { useSyncExternalStore } from "react";
import { CartCheckoutResponseModel } from "@incutonez/ecommerce-spec";
import { GenericAbortSignal } from "axios";
import { CartItemsAPI } from "@/apiConfig.ts";
import { TSubscribeListener } from "@/types.ts";

let listeners: TSubscribeListener[] = [];
let response: CartCheckoutResponseModel = {
	data: [],
	total: 0,
	subTotal: 0,
	tax: 0,
	taxPercent: 0,
	grandTotal: 0,
	shipping: 0,
};

export async function loadCartCheckout(signal: GenericAbortSignal) {
	const { data } = await CartItemsAPI.getCartCheckout({
		signal,
	});
	response = data;
	publishCartCheckout();
	return response;
}

function subscribe(subscriber: TSubscribeListener) {
	listeners = [...listeners, subscriber];
	return () => {
		listeners = listeners.filter((listener) => listener !== subscriber);
	};
}

function getSnapshot() {
	return response;
}

function publishCartCheckout() {
	for (const listener of listeners) {
		listener();
	}
}

export function useCartCheckout() {
	return useSyncExternalStore(subscribe, getSnapshot);
}
