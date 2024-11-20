import { useNavigate } from "@tanstack/react-router";
import { IconError } from "@/assets/icons.tsx";
import { BaseButton } from "@/components/BaseButton.tsx";
import { BaseIcon } from "@/components/BaseIcon.tsx";
import { RouteHome } from "@/routes.ts";

export interface INotFound {
	entityType?: string;
}

export function NotFound({ entityType = "Product" }: INotFound) {
	const navigate = useNavigate();

	function onClickHome() {
		navigate({
			to: RouteHome,
		});
	}

	return (
		<article className="flex h-full flex-col items-center justify-center">
			<BaseIcon
				as={IconError}
				size="size-48"
				className="fill-red-800"
			/>
			<span className="text-xl font-semibold">
				{entityType}
				{" "}
				not found.
			</span>
			<BaseButton
				className="mt-4"
				text="Back to Home"
				onClick={onClickHome}
			/>
		</article>
	);
}
