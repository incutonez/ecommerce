import { BaseHTMLAttributes, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { LoadingMask } from "@/components/LoadingMask.tsx";
import { ContextPaginatedApi } from "@/hooks/api.ts";
import { useOptionsProducts } from "@/hooks/products.ts";
import { ProductTile } from "@/templates/ProductTile.tsx";

export type IProductsList = BaseHTMLAttributes<HTMLElement>;

export function ProductsList({ className = "" }: IProductsList) {
	const { setTotal } = useContext(ContextPaginatedApi)!;
	const { data, isFetching } = useQuery(useOptionsProducts());

	useEffect(() => {
		setTotal(data?.total ?? 0);
	}, [setTotal, data]);

	if (isFetching) {
		return (
			<LoadingMask className={className} />
		);
	}
	const productTiles = data?.data.map((record) => {
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
