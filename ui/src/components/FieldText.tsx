import { KeyboardEvent, useRef } from "react";
import classNames from "classnames";
import { FieldLabel } from "@/components/FieldLabel.tsx";
import { getLabelAlignCls } from "@/components/fields.tsx";
import { TSetTimeout } from "@/types.ts";
import { IEventFieldChange, IFieldText } from "@/types/fields.ts";
import { emptyFn } from "@/utils.ts";

export function FieldText({ label, value = "", setValue, inputRef, inputClassname, size = "h-8", align, placeholder, className, onEnter = emptyFn, typeDelay = 250, onInputChange = emptyFn, onBlur = emptyFn, onFocus = emptyFn }: IFieldText) {
	const typeDelayTimer = useRef<TSetTimeout>(undefined);
	className = classNames(className, getLabelAlignCls(align));
	inputClassname = classNames("px-2 outline-none focus-within:ring-2 focus-within:z-1 ring-yellow-500", inputClassname, size);

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
			<FieldLabel label={label} />
			<input
				ref={inputRef}
				className={inputClassname}
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
				onBlur={onBlur}
				onFocus={onFocus}
			/>
		</article>
	);
}
