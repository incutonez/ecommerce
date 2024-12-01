import { createContext, useContext } from "react";
import { ProductListEntity } from "@incutonez/ecommerce-spec";

export const ContextProductRecord = createContext<ProductListEntity | undefined>(undefined);

export function useProductRecord() {
	return useContext(ContextProductRecord) as ProductListEntity;
}
