import { KeyboardEvent } from "react";
import classNames from "classnames";
import { FieldLabel } from "@/components/FieldLabel.tsx";
import { getLabelAlignCls } from "@/components/fields.tsx";
import { IEventFieldChange, IFieldText } from "@/types/fields.ts";
import { emptyFn } from "@/utils.ts";

export function FieldText({ label, value = "", setValue, inputClassname, size = "h-8", align, placeholder, className, onEnter = emptyFn }: IFieldText) {
	className = classNames(className, getLabelAlignCls(align));
	inputClassname = classNames("px-2 outline-none focus-within:ring-2 focus-within:z-1 ring-yellow-500", inputClassname, size);

	function onChange(event: IEventFieldChange) {
		setValue(event.target.value);
	}

	function onKeyDown({ key, repeat }: KeyboardEvent<HTMLInputElement>) {
		if (!repeat && key === "Enter") {
			onEnter(value);
		}
	}

	return (
		<article className={className}>
			<FieldLabel label={label} />
			<input
				className={inputClassname}
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
		</article>
	);
}
