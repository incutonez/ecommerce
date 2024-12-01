import { queryOptions } from "@tanstack/react-query";
import { UsersAPI } from "@/apiConfig.ts";
import { usePaginatedApi } from "@/hooks/api.ts";

export function useLoadUsers() {
	const { limit, filters, page, setLoading, setTotal } = usePaginatedApi();
	return queryOptions({
		queryKey: ["users", limit, filters, page],
		async queryFn() {
			setLoading(true);
			const { data } = await UsersAPI.listUsers({
				page,
				limit,
				filters,
				start: 0,
			});
			setTotal(data.total ?? 0);
			setLoading(false);
			return data.data;
		},
	});
}

export function useLoadUser(userId: string) {
	return queryOptions({
		queryKey: ["user", userId],
		async queryFn() {
			const { data } = await UsersAPI.getUser(userId);
			return data;
		},
	});
}
