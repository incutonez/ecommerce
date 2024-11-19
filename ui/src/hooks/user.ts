import { decodeToken, isExpired } from "react-jwt";
import { queryOptions } from "@tanstack/react-query";
import { AuthAPI, configuration } from "@/apiConfig.ts";
import { loadCartCount } from "@/stores/cartTotal.ts";

// TODOJEF: MOVE TO GLOBAL STORE
export const optionsUserLoad = queryOptions({
	queryKey: ["User"],
	queryFn: async () => {
		const { data } = await AuthAPI.getAccessToken();
		const token = decodeToken(data.accessToken);
		const expired = isExpired(data.accessToken);
		// Set this on the global configuration so all API calls get access to it
		configuration.baseOptions.headers.Authorization = `Bearer: ${data.accessToken}`;
		await loadCartCount();
		return {
			token,
			expired,
		};
	},
});
