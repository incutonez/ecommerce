import classNames from "classnames";
import { IFieldLabel } from "@/types/fields.ts";

export function FieldLabel({ label, separator = "", className }: IFieldLabel) {
	if (!label) {
		return;
	}
	className = classNames("text-sm font-bold uppercase text-gray-600", className);

	return (
		<label className={className}>
			{label}
			{separator}
		</label>
	);
}
