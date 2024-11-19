import { createContext, useContext } from "react";
import { CartCheckoutResponseModel, CartResponseModel, ProductListEntity } from "@incutonez/ecommerce-spec";
import { UseQueryResult } from "@tanstack/react-query";

export const ContextProductRecord = createContext<ProductListEntity | undefined>(undefined);

export const ContextCart = createContext<UseQueryResult<CartResponseModel> | undefined>(undefined);

export const ContextCartCheckout = createContext<CartCheckoutResponseModel | undefined>(undefined);

export function useProductRecord() {
	return useContext(ContextProductRecord) as ProductListEntity;
}

export function useCartCheckout() {
	return useContext(ContextCartCheckout) as CartCheckoutResponseModel;
}
