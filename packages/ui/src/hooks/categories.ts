import { queryOptions } from "@tanstack/react-query";
import { CategoriesAPI } from "@/apiConfig.ts";

/**
 * Better to separate out the query options like this, so they can be used in useQuery, useSuspenseQuery, etc.
 */
export const optionsCategories = queryOptions({
	queryKey: ["Categories"],
	queryFn: async () => {
		const { data } = await CategoriesAPI.getCategories();
		return data.data;
	},
});
