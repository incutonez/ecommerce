import { ImageEntity, ProductListEntity } from "@incutonez/ecommerce-spec";
import { Link } from "@tanstack/react-router";
import classNames from "classnames";
import { IconAdd, IconDelete, IconRemove } from "@/assets/icons.tsx";
import { BaseButton } from "@/components/BaseButton.tsx";
import { ProductPrice } from "@/components/ProductPrice.tsx";
import { RatingStars } from "@/components/RatingStars.tsx";
import { ContextProductRecord } from "@/contexts.ts";
import { RouteViewProduct } from "@/routes.ts";
import { CartTotalStore, useCartItemTotal } from "@/stores/CartTotal.ts";
import { getImageUrl } from "@/utils.ts";

export interface IProductTile {
	record: ProductListEntity;
}

export interface IProductImage {
	image: ImageEntity;
	size?: string;
}

export function ProductImage({ image, size = "size-52" }: IProductImage) {
	const className = `${size} object-cover`;
	return (
		<img
			src={getImageUrl(image.id)}
			className={className}
			alt={image.name}
		/>
	);
}

export interface IProductTitle {
	name: string;
}

export function ProductTitle({ name }: IProductTitle) {
	return (
		<span
			className="line-clamp-1 font-semibold capitalize hover:text-sky-800"
			title={name}
		>
			{name}
		</span>
	);
}

export interface IProductDescription {
	description: string;
	clamp?: string;
	className?: string;
	clickable?: boolean;
}

export function ProductDescription({ clamp = "line-clamp-2", clickable = true, className = "", description }: IProductDescription) {
	className = classNames("text-sm", clickable ? "hover:text-sky-800" : "", clamp, className);
	return (
		<p className={className}>
			{description}
		</p>
	);
}

export interface IProductCartButtons {
	productId: string;
	alwaysShow?: boolean;
}

export function ProductCartButtons({ productId, alwaysShow = false }: IProductCartButtons) {
	const cartTotal = useCartItemTotal(productId);

	function onClickCartAdd() {
		CartTotalStore.cartAdd(productId);
	}

	function onClickCartRemove() {
		CartTotalStore.cartRemove(productId);
	}

	function onClickDelete() {
		CartTotalStore.cartUpdateCount(productId, 0);
	}

	if (cartTotal || alwaysShow) {
		return (
			<section className="flex w-full space-x-2">
				<BaseButton
					icon={IconDelete}
					onClick={onClickDelete}
					disabled={!cartTotal}
				/>
				<section className="flex flex-1 items-center justify-between">
					<BaseButton
						icon={IconRemove}
						onClick={onClickCartRemove}
						disabled={!cartTotal}
					/>
					<span className="text-sm">
						{cartTotal}
						{" "}
						in cart
					</span>
					<BaseButton
						icon={IconAdd}
						onClick={onClickCartAdd}
					/>
				</section>
			</section>
		);
	}
	return (
		<section>
			<BaseButton
				text="Add to Cart"
				onClick={onClickCartAdd}
			/>
		</section>
	);
}

export function ProductTile({ record }: IProductTile) {
	return (
		<ContextProductRecord.Provider value={record}>
			<article className="flex max-w-52 flex-col items-center rounded">
				<Link
					to={RouteViewProduct}
					params={{
						productId: record.id!,
					}}
					className="flex flex-col"
				>
					<ProductImage image={record.image} />
					<section className="flex w-full flex-col items-stretch border-x p-2">
						<ProductTitle name={record.name} />
						<ProductDescription description={record.description} />
					</section>
				</Link>
				<section className="flex w-full flex-col rounded-b border-x border-b px-2 pb-2">
					<RatingStars rating={record.rating} />
					<ProductPrice
						className="pb-2 pt-1"
						price={record.price}
					/>
					<ProductCartButtons productId={record.id!} />
				</section>
			</article>
		</ContextProductRecord.Provider>
	);
}
