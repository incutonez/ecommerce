import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { IconCartCheckout, IconSearch, IconUsers } from "@/assets/icons.tsx";
import { BaseButton } from "@/components/BaseButton.tsx";
import { FieldComboBox } from "@/components/FieldComboBox.tsx";
import { FieldText } from "@/components/FieldText.tsx";
import { optionsCategories } from "@/hooks/categories.ts";
import { useSelection } from "@/hooks/common.ts";
import { RouteHome, RouteViewCart, RouteViewProducts, RouteViewUsers } from "@/routes.ts";
import { useCart } from "@/stores/CartTotal.ts";

export function NavigationMain() {
	const { search: searchText } = useSearch({
		strict: false,
	});
	const [search, setSearch] = useState(searchText || "");
	const { data = [] } = useQuery(optionsCategories);
	const navigate = useNavigate();
	const [selectedCategory, setSelectedCategory] = useSelection(data[0]);
	const { total } = useCart();
	const cartText = total ? `${total}` : "";

	function onSearchEnter() {
		navigate({
			to: RouteViewProducts,
			search: {
				search,
			},
		});
	}

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
					setSelection={setSelectedCategory}
					className="!h-10 !rounded-r-none"
				/>
				<FieldText
					size="h-10 w-80"
					inputClassname="overflow-hidden"
					placeholder="Search the Market"
					value={search}
					setValue={setSearch}
					onEnter={onSearchEnter}
				/>
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
