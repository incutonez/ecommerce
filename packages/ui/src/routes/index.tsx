import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { LoadingMask } from "@/components/LoadingMask.tsx";
import { optionsProductsFeatured } from "@/hooks/products.ts";
import { RouteHome } from "@/routes.ts";
import { ProductsFeatured } from "@/templates/ProductsFeatured.tsx";

export const Route = createFileRoute(RouteHome)({
	component: RouteComponent,
});

function RouteComponent() {
	const visibleAmount = 3;
	const { isFetching } = useQuery(optionsProductsFeatured(visibleAmount));
	return isFetching ? <LoadingMask /> : <ProductsFeatured visibleAmount={visibleAmount} />;
}
