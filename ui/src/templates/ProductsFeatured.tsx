import { ReactNode, useState } from "react";
import { Transition } from "@headlessui/react";
import { ProductListEntity } from "@incutonez/ecommerce-spec";
import { Link } from "@tanstack/react-router";
import { IconNext, IconPrevious } from "@/assets/icons.tsx";
import { BaseButton } from "@/components/BaseButton.tsx";
import { ProductPrice } from "@/components/ProductPrice.tsx";
import { RatingStars } from "@/components/RatingStars.tsx";
import { ContextProductRecord } from "@/contexts.ts";
import { useInterval } from "@/hooks/common.ts";
import { useGetProductsFeatured } from "@/hooks/products.ts";
import { RouteViewProduct } from "@/routes.ts";
import {
	ProductCartButtons,
	ProductDescription,
	ProductImage,
	ProductTitle,
} from "@/templates/ProductTile.tsx";

export function ProductFeaturedTile({ record }: { record: ProductListEntity }) {
	return (
		<article className="flex flex-1 flex-col rounded border border-gray-700 p-2">
			<ContextProductRecord.Provider value={record}>
				<Link
					className="flex flex-col lg:flex-row lg:space-x-4"
					to={RouteViewProduct}
					params={{
						productId: record.id!,
					}}
				>
					<ProductImage image={record.image} />
					<section className="flex flex-1 flex-col space-y-2 overflow-hidden">
						<ProductTitle name={record.name} />
						<ProductDescription
							clamp="line-clamp-2 lg:line-clamp-[9]"
							description={record.description}
						/>
					</section>
				</Link>
				<section className="flex w-full items-center space-x-4 p-2">
					<ProductPrice
						className="pb-2 pt-1"
						price={record.price}
					/>
					<RatingStars rating={record.rating} />
				</section>
				<ProductCartButtons productId={record.id!} />
			</ContextProductRecord.Provider>
		</article>
	);
}

export function ProductsFeatured({ visibleAmount }: { visibleAmount: number }) {
	const products = useGetProductsFeatured(visibleAmount);
	const [delay, setDelay] = useState<number | null>(8000);
	const [reverse, setReverse] = useState(false);
	const [current, setCurrent] = useState(0);
	const productNodes: ReactNode[] = [];
	const enterFrom = reverse ? "-translate-x-full" : "translate-x-full";
	const leaveTo = reverse ? "translate-x-full" : "-translate-x-full";
	for (let i = 0; i < products.length; i += visibleAmount) {
		const tileNodes: ReactNode[] = [];
		for (let j = 0; j < visibleAmount; j++) {
			const product = products[i + j];
			tileNodes.push((
				<ProductFeaturedTile
					key={product.id}
					record={product}
				/>
			));
		}
		productNodes.push((
			/**
			 * Idea taken from https://marckohler.medium.com/a-tailwindcss-carousel-that-cant-get-any-simpler-cdb423b1bc40
			 */
			<Transition
				key={i}
				show={current === i}
				enter="transition ease-in duration-1000"
				enterFrom={enterFrom}
				enterTo="translate-x-0"
				leave="transition ease-in duration-1000"
				leaveFrom="translate-x-0"
				leaveTo={leaveTo}
			>
				<article className="absolute inset-0 m-4 flex space-x-2">
					{tileNodes}
				</article>
			</Transition>
		));
	}

	/**
	 * This can be called to reset the carousel's scroll... it's needed for when next/previous are clicked because
	 * the user actually wants to see the previous item for a longer period of time, and if the useInterval was close
	 * to calling its callback, then they would only see the item for a short period.
	 */
	function resetTimer() {
		setDelay(null);
		setTimeout(() => setDelay(8000), 2000);
	}

	function previous() {
		setReverse(true);
		if (current === 0) {
			setCurrent(products.length - visibleAmount);
		}
		else {
			setCurrent(current - visibleAmount);
		}
	}

	function next() {
		setReverse(false);
		if (current === products.length - visibleAmount) {
			setCurrent(0);
		}
		else {
			setCurrent(current + visibleAmount);
		}
	}

	function onClickPrevious() {
		resetTimer();
		previous();
	}

	function onClickNext() {
		resetTimer();
		next();
	}

	useInterval(next, delay);

	return (
		<article className="flex size-full items-center px-4">
			<BaseButton
				icon={IconPrevious}
				onClick={onClickPrevious}
			/>
			<article className="relative flex h-full flex-1 space-x-4 overflow-hidden">
				{productNodes}
			</article>
			<BaseButton
				icon={IconNext}
				onClick={onClickNext}
			/>
		</article>
	);
}
