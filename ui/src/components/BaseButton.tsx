import { ComponentProps, ElementType, isValidElement, ReactNode } from "react";
import classNames from "classnames";
import { BaseIcon } from "@/components/BaseIcon.tsx";

export type IBaseButton<T extends ElementType = "button"> = ComponentProps<T> & {
	text?: string | ReactNode;
	icon?: ElementType;
	iconCls?: string;
	iconAfter?: boolean;
	iconSlot?: ReactNode;
	size?: string;
	hidden?: boolean;
	color?: string;
}

export function BaseButton({ text, color = "bg-slate-300 hover:bg-slate-400", icon, iconSlot, hidden = false, size = "h-8", iconCls = "", className, iconAfter = false, ...attrs }: IBaseButton) {
	let textNode: ReactNode;
	const ButtonIcon = iconSlot || icon &&
			<BaseIcon
				as={icon}
				className={iconCls}
			/>;
	if (isValidElement(text)) {
		textNode = text;
	}
	else if (text) {
		textNode = text &&
			<span>
				{text}
			</span>;
	}
	const hiddenCls = hidden ? "hidden" : "";
	const disabledCls = attrs.disabled ? "opacity-70 cursor-not-allowed" : "";
	const buttonCls = classNames("flex items-center rounded space-x-1", color, hiddenCls, size, disabledCls, textNode ? "px-2" : "px-1", className);
	return (
		<button
			className={buttonCls}
			{...attrs}
		>
			{!iconAfter && ButtonIcon}
			{textNode}
			{iconAfter && ButtonIcon}
		</button>
	);
}
