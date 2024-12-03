import { ChangeEvent, ComponentProps } from "react";

export type IEventFieldChange = ChangeEvent<HTMLInputElement>;

export interface IBaseField extends ComponentProps<"article"> {
	label?: string;
	align?: "top" | "left";
	separator?: string;
	size?: string;
	value: string;
}

export interface IFieldLabel extends ComponentProps<"label"> {
	label: string | undefined;
	separator?: string;
}

export interface IFieldText extends IBaseField {
	setValue: (value: string) => void;
	placeholder?: string;
	inputClassname?: string;
	onEnter?: (value: string) => void;
}
