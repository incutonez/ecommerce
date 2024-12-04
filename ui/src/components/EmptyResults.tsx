import { ComponentProps } from "react";
import classNames from "classnames";
import { IconSearchEmpty } from "@/assets/icons.tsx";
import { BaseIcon } from "@/components/BaseIcon.tsx";

export function EmptyResults({ className }: ComponentProps<"article">) {
	className = classNames(className, "size-full flex-col flex items-center justify-center");

	return (
		<article className={className}>
			<BaseIcon
				as={IconSearchEmpty}
				size="size-16"
				className="fill-red-800"
			/>
			<p className="text-xl font-semibold">No results found</p>
		</article>
	);
}
