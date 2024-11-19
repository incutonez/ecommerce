import { BaseHTMLAttributes } from "react";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { LoadingMask } from "@/components/LoadingMask.tsx";
import { useOptionsProducts } from "@/hooks/products.ts";
import { ProductTile } from "@/templates/ProductTile.tsx";

export type IProductsList = BaseHTMLAttributes<HTMLElement>;

export function ProductsList({ className = "" }: IProductsList) {
	const { data, isFetching } = useQuery(useOptionsProducts());
	if (isFetching) {
		return (
			<LoadingMask className={className} />
		);
	}
	const productTiles = data?.map((record) => {
		return (
			<ProductTile
				record={record}
				key={record.id}
			/>
		);
	});
	className = classNames("flex flex-wrap gap-4 p-4", className);

	return (
		<article className={className}>
			{productTiles}
		</article>
	);
}
