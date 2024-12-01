import { ComponentProps } from "react";
import classNames from "classnames";

export interface IFieldDisplay extends ComponentProps<"article"> {
	label?: string;
	value?: string | number;
	align?: "top" | "left";
	separator?: string;
}

export function FieldDisplay({ label, value, className, align = "top", separator, children }: IFieldDisplay) {
	const cls = [];
	if (align === "top") {
		cls.push("flex flex-col space-y-0.5");
	}
	else {
		cls.push("flex space-x-1");
	}
	className = classNames("text-sm", className, cls);
	children ??= (
		<span>
			{value}
		</span>
	);
	return (
		<article className={className}>
			<label className="font-bold uppercase text-gray-600">
				{label}
				{separator}
			</label>
			{children}
		</article>
	);
}
