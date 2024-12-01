import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { IconCartCheckout, IconSearch, IconUsers } from "@/assets/icons.tsx";
import { BaseButton } from "@/components/BaseButton.tsx";
import { FieldComboBox } from "@/components/FieldComboBox.tsx";
import { optionsCategories } from "@/hooks/categories.ts";
import { RouteHome, RouteViewCart, RouteViewUsers } from "@/routes.ts";
import { useCart } from "@/stores/CartTotal.ts";

export function NavigationMain() {
	const categories = useQuery(optionsCategories);
	const { total } = useCart();
	const cartText = total ? `${total}` : "";
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
					options={categories.data ?? []}
					className="!h-10 !rounded-r-none"
				/>
				<input
					className="h-10 w-80 overflow-hidden px-2"
					type="text"
					placeholder="Search the Market"
				/>
				<BaseButton
					className="flex items-center justify-center rounded-l-none rounded-r"
					size="size-10"
					icon={IconSearch}
					iconCls="size-full"
				/>
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
