import pluralize from "pluralize";

const currencyFormatter = new Intl.NumberFormat(navigator.languages, {
	style: "currency",
	/* Always displays in USD, as that's how the values are stored... would need some sort of API converter if needing to
	 * show in user's locale */
	currency: "USD",
});

export function getImageUrl(imageId = "") {
	return `${import.meta.env.VITE_BASE_API}/images/${imageId}`;
}

export function getPrice(value: number) {
	const [whole, fraction] = value.toFixed(2).split(".");
	return {
		fraction,
		whole: parseInt(whole, 10).toLocaleString(),
	};
}

export function toCurrency(value: number) {
	return currencyFormatter.format(value);
}

export function toPercent(value: number) {
	value *= 100;
	return `${value.toFixed(0)}%`;
}

export function uniqueKey(parent: string, id: string | number) {
	return `${parent}_${id}`;
}

export function makePlural(word: string, count?: number, showBefore?: boolean) {
	return pluralize(word, count, showBefore);
}
