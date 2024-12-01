import { createContext, useMemo, useState } from "react";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			/* staleTime by default is set to always say the data that was just fetched is stale... if we set it to
			 * Infinity, then it's never considered stale UNTIL the gcTime clears it from the cache... so in the scenario
			 * below, after 10 seconds of not using that query, the fetched data is cleared from the cache */
			staleTime: Infinity,
			gcTime: 10000,
		},
	},
});

export type TPaginatedApi = ReturnType<typeof usePaginatedApi>;

export const ContextPaginatedApi = createContext<TPaginatedApi | undefined>(undefined);

export function usePaginatedApi() {
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [filters, setFilters] = useState([]);
	const start = useMemo(() => (page - 1) * limit + 1, [page, limit]);
	const end = useMemo(() => start + limit - 1, [start, limit]);
	const previousDisabled = useMemo(() => page <= 1, [page]);
	const lastPage = useMemo(() => {
		if (total) {
			return Math.ceil(total / limit);
		}
		return 1;
	}, [total, limit]);
	const nextDisabled = useMemo(() => page === lastPage, [page, lastPage]);

	function previousPage() {
		setPage(page - 1);
	}

	function nextPage() {
		setPage(page + 1);
	}

	return {
		total,
		setTotal,
		previousPage,
		nextPage,
		lastPage,
		start,
		end,
		previousDisabled,
		nextDisabled,
		loading,
		setLoading,
		page,
		setPage,
		limit,
		setLimit,
		filters,
		setFilters,
	};
}
