import { createContext, useContext } from "react";
import { ProductListEntity } from "@incutonez/ecommerce-spec";
import { ITableDataContext } from "@/types/TableData.ts";

export const ContextProductRecord = createContext<ProductListEntity | undefined>(undefined);

export const ContextTableData = createContext<ITableDataContext | undefined>(undefined);

export function useProductRecord() {
	return useContext(ContextProductRecord) as ProductListEntity;
}

export function useTableDataContext() {
	return useContext(ContextTableData) as ITableDataContext;
}
