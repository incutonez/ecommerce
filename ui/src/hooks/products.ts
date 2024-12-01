import { useContext } from "react";
import { queryOptions } from "@tanstack/react-query";
import { ProductsAPI } from "@/apiConfig.ts";
import { ContextPaginatedApi, queryClient } from "@/hooks/api.ts";

export function useOptionsProducts() {
	const { page, limit, filters, setTotal, setLoading } = useContext(ContextPaginatedApi)!;
	return queryOptions({
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
