import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { LoadingMask } from "@/components/LoadingMask.tsx";
import { optionsProduct } from "@/hooks/products.ts";
import { RouteViewProduct } from "@/routes.ts";

export const Route = createFileRoute(RouteViewProduct)({
	component: RouteComponent,
});

function RouteComponent() {
	const { productId } = Route.useParams();
	const { isFetching } = useQuery(optionsProduct(productId));
	if (isFetching) {
		return (
			<LoadingMask />
		);
	}
	return "Hello /products/$productId!";
}
