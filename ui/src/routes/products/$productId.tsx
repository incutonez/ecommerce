import { BaseHTMLAttributes, useEffect, useRef, useState } from "react";
import { ProductEntity, ReviewEntity } from "@incutonez/ecommerce-spec";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { IconCollapse, IconExpand } from "@/assets/icons.tsx";
import { AvatarUser } from "@/components/AvatarUser.tsx";
import { BaseButton } from "@/components/BaseButton.tsx";
import { LoadingMask } from "@/components/LoadingMask.tsx";
import { ProductPrice } from "@/components/ProductPrice.tsx";
import { RatingStars } from "@/components/RatingStars.tsx";
import { optionsProduct } from "@/hooks/products.ts";
import { RouteViewProduct } from "@/routes.ts";
import { useCartItemTotal } from "@/stores/CartTotal.ts";
import { NotFound } from "@/templates/NotFound.tsx";
import { ProductCartButtons, ProductDescription, ProductImage } from "@/templates/ProductTile.tsx";
import { makePlural, toCurrency, uniqueKey } from "@/utils.ts";

export const Route = createFileRoute(RouteViewProduct)({
	component: RouteComponent,
});

function RouteComponent() {
	const { productId } = Route.useParams();
	const total = useCartItemTotal(productId);
	const { isFetching, data } = useQuery(optionsProduct(productId));
	if (isFetching) {
		return (
			<LoadingMask />
		);
	}
	if (!data) {
		return (
			<NotFound />
		);
	}
	return (
		<article className="flex h-full flex-col overflow-auto p-4">
			<section className="flex space-x-4">
				<ProductImage
					image={data.image}
					size="size-72"
				/>
				<section className="flex flex-1 flex-col">
					<span className="text-4xl font-semibold">
						{data.name}
					</span>
					<div className="mt-2 flex items-center space-x-2 border-b pb-1">
						<RatingStars rating={data.rating} />
						<span>
							{makePlural("review", data.reviews.length, true)}
						</span>
					</div>
					<ProductPrice
						className="mt-1"
						price={data.price}
					/>
					<ProductDescription
						description={data.description}
						clamp=""
						clickable={false}
					/>
				</section>
				<section className="w-64 rounded border p-4">
					<ProductCartButtons
						alwaysShow={true}
						productId={data.id!}
					/>
					<div className="mt-2 flex justify-between">
						<span className="font-semibold">Subtotal:</span>
						<span>
							{toCurrency(data.price * total)}
						</span>
					</div>
				</section>
			</section>
			<ProductReviews product={data} />
		</article>
	);
}

interface IProductReviews {
	product: ProductEntity;
}

interface IProductReview extends BaseHTMLAttributes<HTMLElement> {
	record: ReviewEntity;
}

function ProductReview({ record, ...attrs }: IProductReview) {
	const ref = useRef<HTMLParagraphElement>(null);
	const [collapsed, setCollapsed] = useState(false);
	const [contentHeight, setContentHeight] = useState<number>();
	const collapseIcon = collapsed ? IconExpand : IconCollapse;
	const collapseTitle = collapsed ? "Expand" : "Collapse";
	const descriptionHeight = collapsed ? 0 : contentHeight;

	function onClickCollapse() {
		setCollapsed(!collapsed);
	}

	useEffect(() => {
		if (ref.current?.clientHeight) {
			setContentHeight(ref.current.clientHeight);
		}
	}, []);

	return (
		<article
			{...attrs}
			className="flex flex-col space-y-2 rounded border bg-white p-4"
		>
			<section className="flex items-center justify-between">
				<section className="flex flex-col">
					<section className="flex justify-between">
						<AvatarUser
							random={true}
							name={record.createdBy.firstName}
						/>
					</section>
					<span className="flex items-center space-x-2">
						<h2 className="font-bold">
							{record.title}
						</h2>
						<RatingStars rating={record.rating} />
					</span>
				</section>
				<BaseButton
					title={collapseTitle}
					icon={collapseIcon}
					onClick={onClickCollapse}
				/>
			</section>
			<p
				ref={ref}
				className="overflow-hidden transition-height duration-300"
				style={{
					height: descriptionHeight,
				}}
			>
				{record.description}
			</p>
		</article>
	);
}

function ProductReviews({ product }: IProductReviews) {
	const reviewNodes = product.reviews.map((review) => {
		return (
			<ProductReview
				key={uniqueKey("product-reviews", review.id!)}
				record={review}
			/>
		);
	});
	return (
		<article className="mt-4 flex flex-col space-y-2">
			<h1 className="text-2xl font-semibold">Reviews:</h1>
			<section className="flex flex-col space-y-4">
				{reviewNodes}
			</section>
		</article>
	);
}
