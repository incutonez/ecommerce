import { IBaseField } from "@/types/fields.ts";

export function getLabelAlignCls(align: IBaseField["align"]) {
	let cls = "";
	if (align === "top") {
		cls = "flex flex-col space-y-0.5";
	}
	else {
		cls = "flex space-x-1";
	}
	return cls;
}
