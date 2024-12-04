import { IFieldLabel } from "@/types/fields.ts";

export function FieldLabel({ label, separator = "" }: IFieldLabel) {
	if (!label) {
		return;
	}
	return (
		<label className="text-sm font-bold uppercase text-gray-600">
			{label}
			{separator}
		</label>
	);
}
