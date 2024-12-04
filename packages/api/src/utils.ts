import { PreciseNumber } from "src/types";

export function toDecimal(value: number, decimals = 2) {
	return new PreciseNumber(value).decimalPlaces(decimals).toNumber();
}

export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
