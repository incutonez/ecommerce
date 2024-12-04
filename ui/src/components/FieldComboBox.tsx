import "@/components/FieldComboBox.css";
import { ChangeEvent } from "react";
import classNames from "classnames";
import { IFieldComboBox } from "@/types.ts";

export function FieldComboBox<T extends Record<string, any>>({ options = [], className = "", optionValue = "id", optionLabel = "name", selection, setSelection, ...attrs }: IFieldComboBox<T>) {
	className = classNames("field-combo-box", className);

	function onChange({ currentTarget }: ChangeEvent<HTMLSelectElement>) {
		const { value } = currentTarget;
		setSelection(options.find((option) => String(option.id) === value));
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
