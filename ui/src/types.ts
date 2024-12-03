import { SelectHTMLAttributes, useSyncExternalStore } from "react";
import { ReviewEntity, ReviewUserEntity } from "@incutonez/ecommerce-spec";

export type TSubscribeListener = () => void;

export type ExtStoreSub = Parameters<typeof useSyncExternalStore>[0];

export type ExtStoreSubParam = Parameters<ExtStoreSub>[0];

export function isReviewEntity(record: ReviewEntity | ReviewUserEntity): record is ReviewEntity {
	return "createdBy" in record;
}

export function isReviewUserEntity(record: ReviewEntity | ReviewUserEntity): record is ReviewUserEntity {
	return "productName" in record;
}

export interface IOption {
	id: number;
	name: string;
}

export type IFieldComboBox<TOption> = {
	options: TOption[];
	optionValue?: keyof TOption;
	optionLabel?: keyof TOption;
	selection: TOption | undefined;
	setSelection: (value: TOption | undefined) => void;
} & SelectHTMLAttributes<HTMLSelectElement>;

export interface IProductsSearch {
	search?: string;
}
