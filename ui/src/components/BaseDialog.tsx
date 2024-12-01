import { ComponentProps, ReactNode } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { IconClose } from "@/assets/icons.tsx";
import { BaseButton } from "@/components/BaseButton.tsx";

export interface IBaseDialog extends ComponentProps<"article"> {
	titleSlot?: ReactNode;
	title?: string;
	size?: string;
	show: boolean;
	setShow: (show: boolean) => void;
}

export function BaseDialog({ children, title, show, setShow, titleSlot, className, size = "size-5/6" }: IBaseDialog) {
	const dialogCls = classNames("flex shadow-md border rounded border-gray-300 flex-col absolute left-0 right-0 top-0 bottom-0 m-auto bg-white", show ? "" : "hidden", className, size);
	titleSlot ??= (
		<h1>
			{title}
		</h1>
	);

	function onClickClose() {
		setShow(false);
	}

	const content = (
		<article className={dialogCls}>
			<header className="flex items-center justify-between border-b border-gray-300 bg-gray-100 p-2">
				{titleSlot}
				<BaseButton
					icon={IconClose}
					onClick={onClickClose}
				/>
			</header>
			<section className="flex-1 overflow-auto p-2">
				{children}
			</section>
			<footer className="flex justify-end border-t border-gray-300 p-2">
				<BaseButton
					text="Close"
					onClick={onClickClose}
				/>
			</footer>
		</article>
	);
	return createPortal(content, document.body);
}
