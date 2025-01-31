import { useEffect } from "react";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { BasePagination } from "@/components/BasePagination.tsx";
import { ContextPaginatedApi, usePaginatedApi } from "@/hooks/api.ts";
import { ProductsList } from "@/templates/ProductsList.tsx";
import { IProductsSearch } from "@/types.ts";

export const Route = createFileRoute("/products_/")({
	component: RouteComponent,
	validateSearch({ search = "" }: Record<string, unknown>): IProductsSearch {
		return {
			search: search as string,
		};
	},
});

function RouteComponent() {
	const { search } = useSearch({
		from: "/products_/",
	});
	const api = usePaginatedApi({
		search,
	});

	useEffect(() => {
		api.setSearch(search);
	}, [api, search]);

	return (
		<ContextPaginatedApi.Provider value={api}>
			<ProductsList className="flex-1 overflow-auto" />
			<BasePagination	/>
		</ContextPaginatedApi.Provider>
	);
}
