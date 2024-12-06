import { IBaseField } from "@/types/fields.ts";

export function getLabelAlignCls(align: IBaseField["align"]) {
	let cls = "";
	if (align === "top") {
		cls = "flex flex-col";
	}
	else {
		cls = "flex space-x-2";
	}
	return cls;
}
