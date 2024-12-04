import { BaseHTMLAttributes } from "react";
import { IconStar, IconStarEmpty, IconStarHalf } from "@/assets/icons.tsx";
import { BaseIcon } from "@/components/BaseIcon.tsx";

export type IRatingStars = BaseHTMLAttributes<HTMLElement> & {
	rating: number;
}

export function RatingStars({ rating }: IRatingStars) {
	const starNodes = [];
	const size = "size-5";
	const starCls = "fill-yellow-500";
	// Get the total number of stars by halves
	const stars = Math.round(rating * 2);
	// Get the actual number of half star icons to show (either 1 or 0)
	const halfStars = stars % 2;
	const fullStars = (stars - halfStars) / 2;
	for (let i = 0; i < fullStars; i++) {
		starNodes.push((
			<BaseIcon
				as={IconStar}
				key={i}
				className={starCls}
				size={size}
			/>
		));
	}
	if (halfStars) {
		starNodes.push((
			<BaseIcon
				as={IconStarHalf}
				key={fullStars}
				className={starCls}
				size={size}
			/>
		));
	}
	for (let i = starNodes.length; i < 5; i++) {
		starNodes.push((
			<BaseIcon
				as={IconStarEmpty}
				key={i}
				className={starCls}
				size={size}
			/>
		));
	}
	const ratingTitle = `Rating: ${rating} out of 5 stars`;
	return (
		<article
			className="flex"
			title={ratingTitle}
		>
			{starNodes}
		</article>
	);
}
