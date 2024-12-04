import { BaseHTMLAttributes } from "react";

export type ILoadingMask = BaseHTMLAttributes<HTMLDivElement>;

export function LoadingMask({ ...attrs }: ILoadingMask) {
	return (
		<div {...attrs}>Loading...</div>
	);
}
