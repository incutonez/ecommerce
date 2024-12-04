import { FocusEvent, useRef, useState } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { FieldText } from "@/components/FieldText.tsx";
import { IFieldText } from "@/types/fields.ts";
import { emptyFn } from "@/utils.ts";

export type IFieldDropdown = IFieldText

export function FieldDropdown({ children, onEnter = emptyFn, onInputChange = emptyFn, ...attrs }: IFieldDropdown) {
	const inputRef = useRef<HTMLInputElement>(null);
	const contentRef = useRef<HTMLElement>(null);
	const [show, setShow] = useState(false);
	const contentCls = classNames("absolute rounded-b border border-gray-300 bg-white shadow-2xl", show && children ? "" : "hidden");
	const content = (
		<section
			className={contentCls}
			ref={contentRef}
		>
			{children}
		</section>
	);
	const dropdown = createPortal(content, document.body);

	function onBlur(event: FocusEvent<HTMLElement>) {
		setShow(false);
		// relatedTarget in this scenario is the anchor tag that received the focus
		if (event.relatedTarget instanceof HTMLAnchorElement && event.relatedTarget.dataset.dropdown) {
			/**
			 * The blur event was swallowing up the click, so we have to manually call the click
			 * Source: https://stackoverflow.com/a/78221741/1253609
			 */
			event.relatedTarget.click();
		}
	}

	function onFocus() {
		setShow(true);
	}

	function onChange(value: string) {
		onInputChange(value);
		const { current: inputRefCurrent } = inputRef;
		const { current: contentRefCurrent } = contentRef;
		if (contentRefCurrent && inputRefCurrent) {
			const bounds = inputRefCurrent.getBoundingClientRect();
			contentRefCurrent.style.top = `${bounds.bottom}px`;
			contentRefCurrent.style.left = `${bounds.left}px`;
			contentRefCurrent.style.width = `${bounds.width}px`;
		}
		setShow(true);
	}

	function onInputEnter(value: string) {
		onEnter(value);
		inputRef.current?.blur();
	}

	return (
		<article
			className="relative"
			onBlur={onBlur}
		>
			<FieldText
				{...attrs}
				onInputChange={onChange}
				onFocus={onFocus}
				onEnter={onInputEnter}
				inputRef={inputRef}
			/>
			{dropdown}
		</article>
	);
}
