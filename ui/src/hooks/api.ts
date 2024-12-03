import { createContext, useMemo, useState } from "react";
import { EnumFilterType, FilterType, SortType } from "@incutonez/ecommerce-spec";
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
			retry: false,
		},
	},
});

export interface IUsePaginatedApi {
	initialPage?: number;
	initialLimit?: number;
	search?: string;
}

export type TPaginatedApi = ReturnType<typeof usePaginatedApi>;

export const ContextPaginatedApi = createContext<TPaginatedApi | undefined>(undefined);

export function usePaginatedApi(params?: IUsePaginatedApi) {
	params ??= {};
	params.initialLimit ??= 20;
	params.initialPage ??= 1;
	const initialFilters: FilterType[] = [];
	if (params.search) {
		initialFilters.push({
			type: EnumFilterType.Search,
			value: params.search,
		});
	}
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(params.initialPage);
	const [limit, setLimit] = useState(params.initialLimit);
	const [filters, setFilters] = useState<FilterType[]>(initialFilters);
	const [sorters, setSorters] = useState<SortType[]>([]);
	const start = useMemo(() => (page - 1) * limit + 1, [page, limit]);
	const end = useMemo(() => {
		const value = start + limit - 1;
		return value > total ? total : value;
	}, [total, start, limit]);
	const previousDisabled = useMemo(() => page <= 1, [page]);
	const lastPage = useMemo(() => {
		if (total) {
			return Math.ceil(total / limit);
		}
		return 1;
	}, [total, limit]);
	const nextDisabled = useMemo(() => page === lastPage, [page, lastPage]);

	function setSearch(search: string | undefined) {
		const found = filters.find((filter) => filter.type === EnumFilterType.Search);
		// When they're the same, there's no reason to mutate because it'll cause infinite rendering
		if (found?.value === search) {
			return;
		}
		/* We're going from having a search to no search value, so let's just filter out the search.  If we didn't do this,
		 * then there'd be a rendering issue with the code below because we'd be mutating the array every time */
		else if (found && !search) {
			const tempFilters = filters.filter((filter) => filter.type !== EnumFilterType.Search);
			setFilters(tempFilters);
			return;
		}
		else if (search) {
			const tempFilters = filters.filter((filter) => filter.type !== EnumFilterType.Search);
			if (search) {
				tempFilters.push({
					type: EnumFilterType.Search,
					value: search,
				});
			}
			setFilters(tempFilters);
		}
	}

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
		sorters,
		setSorters,
		setSearch,
	};
}
