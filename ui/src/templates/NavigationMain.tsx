import { ReactNode, useEffect, useState } from "react";
import { CategoryEntity, EnumFilterType } from "@incutonez/ecommerce-spec";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { IconCartCheckout, IconSearch, IconUsers } from "@/assets/icons.tsx";
import { BaseButton } from "@/components/BaseButton.tsx";
import { FieldComboBox } from "@/components/FieldComboBox.tsx";
import { FieldDropdown } from "@/components/FieldDropdown.tsx";
import { usePaginatedApi } from "@/hooks/api.ts";
import { optionsCategories } from "@/hooks/categories.ts";
import { useSelection } from "@/hooks/common.ts";
import { useOptionsProductsSearch } from "@/hooks/products.ts";
import { RouteHome, RouteViewCart, RouteViewProducts, RouteViewUsers } from "@/routes.ts";
import { useCart } from "@/stores/CartTotal.ts";
import { ProductsSearch } from "@/templates/ProductsSearch.tsx";

export function NavigationMain() {
	const { search: searchText } = useSearch({
		strict: false,
	});
	const [search, setSearch] = useState(searchText || "");
	const { data = [] } = useQuery(optionsCategories);
	const paginatedApi = usePaginatedApi();
	const { refetch, data: productsSearch = [] } = useQuery(useOptionsProductsSearch(paginatedApi));
	const navigate = useNavigate();
	const [selectedCategory, setSelectedCategory] = useSelection(data[0]);
	const { total } = useCart();
	const cartText = total ? `${total}` : "";

	function onChangeSearch(value: string) {
		paginatedApi.setSearch(value);
	}

	function onChangeCategory(value: CategoryEntity | undefined) {
		setSelectedCategory(value);
		if (value) {
			paginatedApi.addFilter({
				value: value.id!,
				field: "category_id",
				type: EnumFilterType.Contains,
			});
		}
		else {
			paginatedApi.removeFilter("category_id");
		}
	}

	function onSearchEnter() {
		navigate({
			to: RouteViewProducts,
			search: {
				search,
			},
		});
	}

	let productSearchNodes: ReactNode;
	if (productsSearch.length) {
		productSearchNodes = <ProductsSearch records={productsSearch} />;
	}

	useEffect(() => {
		if (paginatedApi.filters.length) {
			refetch();
		}
	}, [refetch, paginatedApi.filters]);

	return (
		<nav className="flex items-center bg-slate-700 p-4">
			<Link
				to={RouteHome}
				className="mr-40"
			>
				<span className="text-4xl font-semibold text-amber-500">The Market</span>
			</Link>
			<section className="flex">
				<FieldComboBox
					options={data}
					selection={selectedCategory}
					setSelection={onChangeCategory}
					className="!h-10 !rounded-r-none"
				/>
				<FieldDropdown
					size="h-10 w-80"
					inputClassname="overflow-hidden rounded-none"
					placeholder="Search the Market"
					value={search}
					setValue={setSearch}
					onEnter={onSearchEnter}
					onInputChange={onChangeSearch}
				>
					{productSearchNodes}
				</FieldDropdown>
				<Link
					to={RouteViewProducts}
					search={{
						search,
					}}
				>
					<BaseButton
						className="flex items-center justify-center rounded-l-none rounded-r"
						size="size-10"
						icon={IconSearch}
						iconCls="size-full"
					/>
				</Link>
			</section>
			<section className="ml-auto flex space-x-2">
				<Link to={RouteViewUsers}>
					<BaseButton
						className="text-lg font-semibold"
						size="h-10"
						icon={IconUsers}
						iconCls="size-8"
						title="Users"
					/>
				</Link>
				<Link to={RouteViewCart}>
					<BaseButton
						className="text-lg font-semibold"
						size="h-10"
						icon={IconCartCheckout}
						iconCls="size-8"
						title="Checkout"
						text={cartText}
					/>
				</Link>
			</section>
		</nav>
	);
}
