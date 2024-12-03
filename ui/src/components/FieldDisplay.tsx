import classNames from "classnames";
import { FieldLabel } from "@/components/FieldLabel.tsx";
import { getLabelAlignCls } from "@/components/fields.tsx";
import { IBaseField } from "@/types/fields.ts";

export function FieldDisplay({ label, value, className, align = "top", separator, children }: IBaseField) {
	className = classNames(className, getLabelAlignCls(align));
	children ??= (
		<span className="text-sm">
			{value}
		</span>
	);
	return (
		<article className={className}>
			<FieldLabel
				label={label}
				separator={separator}
			/>
			{children}
		</article>
	);
}
