import { ChangeEvent, ComponentProps, ReactNode, RefObject } from "react";

export type IEventFieldChange = ChangeEvent<HTMLInputElement>;

export interface IBaseField extends ComponentProps<"article"> {
	label?: string;
	labelAttrs?: ComponentProps<"label">;
	align?: "top" | "left";
	separator?: string;
	size?: string;
	value?: string;
	inputAttrs?: ComponentProps<"input">;
}

export interface IFieldLabel extends ComponentProps<"label"> {
	label: string | undefined;
	separator?: string;
}

export interface IFieldText extends IBaseField {
	placeholder?: string;
	inputClassname?: string;
	typeDelay?: number;
	inputRef?: RefObject<HTMLInputElement | null>;
	messageSlot?: ReactNode;
	setValue: (value: string) => void;
	onEnter?: (value: string) => void;
	// This is only useful if you're using typeDelay... it will fire after the delay has finished
	onInputChange?: (value: string) => void;
}
