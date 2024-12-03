import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createHashHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { LoadingMask } from "@/components/LoadingMask.tsx";
import { queryClient } from "@/hooks/api.ts";
import { routeTree } from "@/routeTree.gen.ts";
import { UserStore, useUserStore } from "@/stores/User.ts";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

const router = createRouter({
	routeTree,
	/**
   * We want this because we want to be able to reuse our route string constants in routes.ts... if we didn't do this,
   * then the route generation has a mix of keys with trailing slash, but the path of the route wouldn't have the slash.
   * When we specify preserve, it will use the URLs as they're defined in the string.  The default is never, which would
   * strip out the trailing slash, if we provided it, which would cause issues for routes that have it.  When it gets
   * stripped out, and we're dealing with an index file, then it assumes params are required
   */
	trailingSlash: "preserve",
	history: createHashHistory(),
});

export function App() {
	const { token } = useUserStore();
	useEffect(() => {
		UserStore.load();
		return () => {
			UserStore.abort();
		};
	}, []);
	if (!token) {
		return (
			<LoadingMask />
		);
	}
	// Only allow the rest of the app if we've authenticated properly... this prevents any routes from loading before we've authed
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}
