import { BaseButton } from "@/components/BaseButton.tsx";
import { useCartCheckout } from "@/stores/cartCheckout.ts";
import { ProductCartButtons, ProductDescription, ProductImage } from "@/templates/ProductTile.tsx";
import { toCurrency, uniqueKey } from "@/utils.ts";

export function CheckoutItems() {
	const { data } = useCartCheckout();
	const productNodes = data.map(({ count, product }) => {
		const itemTotal = count > 1 ? `(${count} x ${toCurrency(product.price)})` : "";
		return (
			<section
				className="flex space-x-2 bg-slate-100 p-2"
				key={uniqueKey("cartCheckout", product.id!)}
			>
				<ProductImage
					image={product.image}
					size="size-32"
				/>
				<section className="flex flex-1 flex-col space-y-1">
					<span className="font-semibold">
						{product.name}
					</span>
					<ProductDescription description={product.description} />
					<span className="!mt-auto flex items-center">
						<span className="font-semibold">
							{toCurrency(product.price * count)}
						</span>
						<span className="ml-1 text-sm">
							{itemTotal}
						</span>
						<section className="ml-auto w-72">
							<ProductCartButtons productId={product.id!} />
						</section>
					</span>
				</section>
			</section>
		);
	});
	return (
		<article className="flex flex-1 flex-col space-y-2 overflow-auto">
			{productNodes}
		</article>
	);
}

export function CheckoutTotal() {
	const { subTotal, total, shipping, tax, taxPercent, grandTotal } = useCartCheckout();
	return (
		<article className="flex flex-col space-y-1">
			<section className="flex justify-between">
				<span>
					Items (
					{total}
					):
				</span>
				<span>
					{toCurrency(subTotal)}
				</span>
			</section>
			<section className="flex justify-between">
				<span>
					Shipping:
				</span>
				<span>
					{toCurrency(shipping)}
				</span>
			</section>
			<section className="flex justify-between">
				<span>
					Tax (
					{taxPercent * 100}
					%):
				</span>
				<span>
					{toCurrency(tax)}
				</span>
			</section>
			<section className="flex justify-between border-t border-gray-300 text-lg font-semibold">
				<span className="mr-8">
					Order Total:
				</span>
				<span>
					{toCurrency(grandTotal)}
				</span>
			</section>
			<BaseButton
				text="Submit Order"
				className="mx-auto w-36 justify-center"
				color="bg-blue-300 hover:bg-blue-400"
			/>
		</article>
	);
}
