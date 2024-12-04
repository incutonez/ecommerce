import { BaseHTMLAttributes } from "react";
import classNames from "classnames";
import { getPrice } from "@/utils.ts";

export interface IProductPrice extends BaseHTMLAttributes<HTMLElement> {
	price: number;
}

export function ProductPrice({ price, className = "" }: IProductPrice) {
	const { whole, fraction } = getPrice(price);
	className = classNames("flex items-start space-x-0.5", className);
	return (
		<div className={className}>
			<span className="text-sm leading-7">$</span>
			<span className="text-2xl font-semibold">
				{whole}
			</span>
			<span className="text-sm leading-7">
				{fraction}
			</span>
		</div>
	);
}
