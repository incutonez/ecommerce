import "@/components/FieldComboBox.css";
import { ChangeEvent, SelectHTMLAttributes, useState } from "react";
import classNames from "classnames";

export interface IOption {
	id: number;
	name: string;
}

export type IFieldComboBox<TOption> = {
	options: TOption[];
	optionValue?: keyof TOption;
	optionLabel?: keyof TOption;
	selected?: TOption;
	onSelectionChange?: (selected?: TOption) => void;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function FieldComboBox<T extends Record<string, any>>({ options = [], className = "", onSelectionChange, optionValue = "id", optionLabel = "name", ...attrs }: IFieldComboBox<T>) {
	const [selection, setSelection] = useState<T | undefined>(undefined);
	className = classNames("field-combo-box", className);
	function onChange({ currentTarget }: ChangeEvent<HTMLSelectElement>) {
		const { value } = currentTarget;
		const found = options.find((option) => String(option.id) === value);
		setSelection(found);
		if (onSelectionChange) {
			onSelectionChange(found);
		}
	}

	const optionNodes = options.map((option) => {
		const value = option[optionValue];
		const label = option[optionLabel];
		return (
			<option
				key={value}
				value={value}
			>
				{label}
			</option>
		);
	});
	return (
		<select
			value={selection?.[optionValue]}
			onChange={onChange}
			className={className}
			{...attrs}
		>
			{optionNodes}
		</select>
	);
}
