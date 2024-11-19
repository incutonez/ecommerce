import { useContext } from "react";
import { queryOptions } from "@tanstack/react-query";
import { ProductsAPI } from "@/apiConfig.ts";
import { ContextPaginatedApi, queryClient } from "@/hooks/api.ts";

export function useOptionsProducts() {
	const { page, limit, filters, setTotal, setLoading } = useContext(ContextPaginatedApi)!;
	return queryOptions({
		/* staleTime by default is set to always say the data that was just fetched is stale... if we set it to
     * Infinity, then it's never considered stale UNTIL the gcTime clears it from the cache... so in the scenario
     * below, after 10 seconds of not using that query, the fetched data is cleared from the cache */
		staleTime: Infinity,
		gcTime: 10000,
		queryKey: ["Products", page, limit, filters],
		queryFn: async () => {
			setLoading(true);
			const { data } = await ProductsAPI.listProducts({
				page,
				limit,
				filters,
				start: 0,
			});
			setTotal(data.total ?? 0);
			setLoading(false);
			return data.data;
		},
	});
}

export function optionsProduct(productId: string) {
	return queryOptions({
		staleTime: Infinity,
		queryKey: ["Product", productId],
		queryFn: async () => {
			const { data } = await ProductsAPI.getProduct(productId);
			return data;
		},
	});
}

export function optionsProductsFeatured(visibleAmount = 2) {
	return queryOptions({
		queryKey: ["ProductsFeatured", visibleAmount],
		queryFn: async () => {
			const { data } = await ProductsAPI.getFeaturedProducts(visibleAmount);
			return data;
		},
	});
}

export function useGetProductsFeatured(visibleAmount?: number) {
	return queryClient.getQueryData(optionsProductsFeatured(visibleAmount).queryKey) ?? [];
}

export function useProductRecords() {
	return queryClient.getQueryData(useOptionsProducts().queryKey);
}
