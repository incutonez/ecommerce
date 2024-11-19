import { AuthApi, CartItemsApi, CategoriesApi, Configuration, ImagesApi, ProductsApi } from "@incutonez/ecommerce-spec";

export const configuration = new Configuration({
	basePath: import.meta.env.VITE_BASE_API,
	baseOptions: {
		headers: {},
	},
});

export const ProductsAPI = new ProductsApi(configuration);

export const CategoriesAPI = new CategoriesApi(configuration);

export const ImagesAPI = new ImagesApi(configuration);

export const AuthAPI = new AuthApi(configuration);

export const CartItemsAPI = new CartItemsApi(configuration);
