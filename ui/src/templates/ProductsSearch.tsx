import { ProductListEntity } from "@incutonez/ecommerce-spec";
import { Link } from "@tanstack/react-router";
import { RouteViewProduct } from "@/routes.ts";
import { ProductImage, ProductTitle } from "@/templates/ProductTile.tsx";
import { uniqueKey } from "@/utils.ts";

export interface IProductsSearch {
	records: ProductListEntity[]
}

export function ProductsSearch({ records }: IProductsSearch) {
	const productNodes = records.map((record) => {
		return (
			<Link
				className="flex cursor-pointer space-x-2 p-2 hover:bg-sky-100 hover:text-sky-800"
				key={uniqueKey("productsSearch", record.id!)}
				to={RouteViewProduct}
				params={{
					productId: record.id!,
				}}
				data-dropdown
			>
				<ProductImage
					image={record.image}
					size="size-16"
				/>
				<ProductTitle name={record.name} />
			</Link>
		);
	});

	return (
		<article className="z-1 flex flex-col">
			{productNodes}
		</article>
	);
}
