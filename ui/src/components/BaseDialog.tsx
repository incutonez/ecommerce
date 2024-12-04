import { ComponentProps, ReactNode } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { IconClose } from "@/assets/icons.tsx";
import { BaseButton } from "@/components/BaseButton.tsx";

export interface IBaseDialog extends ComponentProps<"article"> {
	titleSlot?: ReactNode;
	footerSlot?: ReactNode;
	bodyCls?: string;
	title?: string;
	size?: string;
	closable?: boolean;
	show: boolean | undefined;
	setShow: (show: boolean) => void;
}

export function BaseDialog({ children, bodyCls, title, show, setShow, titleSlot, className, size = "size-5/6", closable = true, footerSlot }: IBaseDialog) {
	const dialogCls = classNames("flex shadow-md border rounded border-gray-300 flex-col absolute left-0 right-0 top-0 bottom-0 m-auto bg-white", show ? "" : "hidden", className, size);
	let titleCloseNode: ReactNode;
	let closeButtonNode: ReactNode;
	bodyCls = classNames("flex-1 overflow-auto p-2", bodyCls);
	titleSlot ??= (
		<h1 className="font-bold">
			{title}
		</h1>
	);

	if (closable) {
		titleCloseNode = (
			<BaseButton
				icon={IconClose}
				onClick={onClickClose}
			/>
		);
		closeButtonNode = (
			<BaseButton
				text="Close"
				onClick={onClickClose}
			/>
		);
	}

	function onClickClose() {
		setShow(false);
	}

	const content = (
		<article className={dialogCls}>
			<header className="flex items-center justify-between border-b border-slate-400 bg-slate-200 p-2">
				{titleSlot}
				{titleCloseNode}
			</header>
			<section className={bodyCls}>
				{children}
			</section>
			<footer className="flex justify-end border-t border-slate-400 p-2">
				{footerSlot}
				{closeButtonNode}
			</footer>
		</article>
	);
	return createPortal(content, document.body);
}
