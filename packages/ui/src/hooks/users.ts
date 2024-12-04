import { queryOptions } from "@tanstack/react-query";
import { UsersAPI } from "@/apiConfig.ts";
import { TPaginatedApi } from "@/hooks/api.ts";

export function useLoadUsers({ limit, filters, page, setLoading, setTotal, sorters }: TPaginatedApi) {
	return queryOptions({
		queryKey: [
			"users",
			limit,
			filters,
			page,
			sorters,
		],
		async queryFn() {
			setLoading(true);
			const { data } = await UsersAPI.listUsers({
				start: 0,
				page,
				limit,
				filters,
				sorters,
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
