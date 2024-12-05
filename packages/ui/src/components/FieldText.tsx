import { KeyboardEvent, useRef } from "react";
import classNames from "classnames";
import { FieldLabel } from "@/components/FieldLabel.tsx";
import { getLabelAlignCls } from "@/components/fields.tsx";
import { TSetTimeout } from "@/types.ts";
import { IEventFieldChange, IFieldText } from "@/types/fields.ts";
import { emptyFn } from "@/utils.ts";

export function FieldText({ label, separator, value = "", setValue, inputRef, inputClassname, size = "h-8", align = "top", placeholder, className, onEnter = emptyFn, typeDelay = 250, onInputChange = emptyFn, onBlur = emptyFn, onFocus = emptyFn, inputAttrs = {}, labelAttrs = {} }: IFieldText) {
	const typeDelayTimer = useRef<TSetTimeout>(undefined);
	className = classNames(className, getLabelAlignCls(align));
	inputClassname = classNames("px-2 outline-none focus-within:ring-2 focus-within:z-1 ring-yellow-500 border border-gray-300 rounded", inputClassname, size);
	inputAttrs.type ??= "text";

	function onChange({ target }: IEventFieldChange) {
		const { value = "" } = target;
		setValue(value);
		// If they've typed in between our current timeout, then let's cancel and reset it
		clearTimeout(typeDelayTimer.current);
		typeDelayTimer.current = setTimeout(() => onInputChange(value), typeDelay);
	}

	function onKeyDown({ key, repeat }: KeyboardEvent<HTMLInputElement>) {
		if (!repeat && key === "Enter") {
			onEnter(value);
		}
	}

	return (
		<article className={className}>
			<FieldLabel
				{...labelAttrs}
				label={label}
				separator={separator}
			/>
			<input
				ref={inputRef}
				className={inputClassname}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
				onBlur={onBlur}
				onFocus={onFocus}
				{...inputAttrs}
			/>
		</article>
	);
}