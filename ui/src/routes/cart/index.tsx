import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RouteViewCart } from "@/routes.ts";
import { loadCartCheckout } from "@/stores/cartCheckout.ts";
import { useCart } from "@/stores/cartTotal.ts";
import { CheckoutItems, CheckoutTotal } from "@/templates/CartCheckout.tsx";

export const Route = createFileRoute(RouteViewCart)({
	component: RouteComponent,
});

function RouteComponent() {
	const { total } = useCart();
	/**
	 * Because StrictMode is enabled, this will throw an error in the console because it gets hit twice, but if
	 * StrictMode is removed, it's only called once... this is an unfortunate side effect of StrictMode
	 */
	useEffect(() => {
		const controller = new AbortController();
		loadCartCheckout(controller.signal);
		return () => {
			controller.abort();
		};
	}, [total]);
	return (
		<article className="flex h-full space-x-8 p-4">
			<CheckoutItems />
			<CheckoutTotal />
		</article>
	);
}
