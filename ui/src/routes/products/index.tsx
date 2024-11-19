import { createFileRoute } from "@tanstack/react-router";
import { BasePagination } from "@/components/BasePagination.tsx";
import { ContextPaginatedApi, usePaginatedApi } from "@/hooks/api.ts";
import { RouteViewProducts } from "@/routes.ts";
import { ProductsList } from "@/templates/ProductsList.tsx";

export const Route = createFileRoute(RouteViewProducts)({
	component: RouteComponent,
});

function RouteComponent() {
	const api = usePaginatedApi();
	return (
		<ContextPaginatedApi.Provider value={api}>
			<ProductsList className="flex-1 overflow-auto" />
			<BasePagination	/>
		</ContextPaginatedApi.Provider>
	);
}
