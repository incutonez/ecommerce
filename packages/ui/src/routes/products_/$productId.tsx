import { BaseHTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import { ReviewEntity, ReviewUserEntity } from "@incutonez/ecommerce-spec";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { IconCollapse, IconExpand } from "@/assets/icons.tsx";
import { BaseButton } from "@/components/BaseButton.tsx";
import { LoadingMask } from "@/components/LoadingMask.tsx";
import { ProductPrice } from "@/components/ProductPrice.tsx";
import { RatingStars } from "@/components/RatingStars.tsx";
import { optionsProduct } from "@/hooks/products.ts";
import { RouteViewProduct } from "@/routes.ts";
import { useCartItemTotal } from "@/stores/CartTotal.ts";
import { NotFound } from "@/templates/NotFound.tsx";
import { ProductCartButtons, ProductDescription, ProductImage } from "@/templates/ProductTile.tsx";
import { UserAvatar } from "@/templates/Users.tsx";
import { isReviewEntity, isReviewUserEntity } from "@/types.ts";
import { makePlural, toCurrency, uniqueKey } from "@/utils.ts";

interface IProductReviews {
	reviews?: ReviewEntity[];
}

interface IProductReview extends BaseHTMLAttributes<HTMLElement> {
	record: ReviewEntity | ReviewUserEntity;
}

export const Route = createFileRoute("/products_/$productId")({
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
			<ProductReviews reviews={data.reviews} />
		</article>
	);
}

export function ProductReview({ record, ...attrs }: IProductReview) {
	const ref = useRef<HTMLParagraphElement>(null);
	const [collapsed, setCollapsed] = useState(false);
	const [contentHeight, setContentHeight] = useState<number>();
	const collapseIcon = collapsed ? IconExpand : IconCollapse;
	const collapseTitle = collapsed ? "Expand" : "Collapse";
	const descriptionHeight = collapsed ? 0 : contentHeight;
	let createdBy: ReactNode;
	if (isReviewEntity(record) && record.createdBy) {
		createdBy = (
			<UserAvatar
				random={true}
				name={`${record.createdBy.firstName} ${record.createdBy.lastName}`}
				userId={record.createdBy.id}
				gender={record.createdBy.gender}
			/>
		);
	}
	else if (isReviewUserEntity(record)) {
		createdBy = (
			<Link
				className="font-bold hover:text-sky-800"
				to={RouteViewProduct}
				params={{
					productId: record.productId,
				}}
			>
				{record.productName}
			</Link>
		);
	}

	function onClickCollapse() {
		setCollapsed(!collapsed);
	}

	useEffect(() => {
		if (ref.current?.clientHeight) {
			setContentHeight(ref.current.clientHeight);
		}
		setCollapsed(true);
	}, []);

	return (
		<article
			{...attrs}
			className="flex flex-col space-y-2 rounded border bg-white p-4"
		>
			<section className="flex items-center justify-between space-x-2">
				<section className="flex flex-col">
					{createdBy}
					<span className="flex items-center space-x-2">
						<h2 className="line-clamp-1">
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
				className="overflow-hidden transition-[height] duration-300"
				style={{
					height: descriptionHeight,
				}}
			>
				{record.description}
			</p>
		</article>
	);
}

export function ProductReviewNodes({ reviews }: IProductReviews) {
	const nodes = reviews?.map((review) => {
		return (
			<ProductReview
				key={uniqueKey("product-reviews", review.id!)}
				record={review}
			/>
		);
	});
	return (
		<>
			{nodes}
		</>
	);
}

export function ProductReviews({ reviews }: IProductReviews) {
	if (!reviews) {
		return;
	}
	return (
		<article className="mt-4 flex flex-col space-y-2">
			<h1 className="text-2xl font-semibold">Reviews:</h1>
			<section className="flex flex-col space-y-4">
				<ProductReviewNodes reviews={reviews} />
			</section>
		</article>
	);
}
