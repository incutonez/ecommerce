import { ComponentProps, ReactNode } from "react";
import { EnumSortType } from "@incutonez/ecommerce-spec";
import { TPaginatedApi } from "@/hooks/api.ts";

export interface ITableColumnProp<T = never> {
	title?: string;
	field?: string;
	cellCls?: string;
	truncate?: boolean;
	renderer?: (record: T) => ReactNode;
}

export interface IEventRowClick<T = never> {
	record: T;
	index: number;
}

export type ITableData<T = never> = ComponentProps<"table"> & {
	headerNodes?: ReactNode;
	rowNodes?: ReactNode;
	columns?: ITableColumnProp<T>[];
	data?: T[];
	loading?: boolean;
	clickRow?: (props: IEventRowClick<T>) => void;
	paginatedApi?: TPaginatedApi;
}

export type ITableColumn = ComponentProps<"th"> & {
	title?: string;
	config: ITableColumnProp;
}

export type ITableCell = ComponentProps<"td"> & {
	text?: string | number;
	truncate?: boolean;
}

export interface ITableDataContext {
	api?: TPaginatedApi;
}

export interface ITableColumnSort {
	direction: EnumSortType | undefined;
}
