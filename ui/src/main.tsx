import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { createHashHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import axios, { isCancel } from "axios";
import { queryClient } from "@/hooks/api.ts";
import { routeTree } from "@/routeTree.gen.ts";

/**
 * TODOJEF:
 * - Wiring up the search and get the results page working
 * - Add a users page/table component
 * - Add a user tooltip that shows some minimized profile details and a link to their page
 * -- Their page should show a list of their reviews
 */
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

/**
 * In StrictMode, we sometimes get double renderings that call 2 APIs, but the load API is called so quickly that it
 * doesn't actually have a chance to make a network call, but it still gets aborted, which is bubbled as a global error
 * instead of an Axios error.  So that's the scenario being handled here.
 */
addEventListener("unhandledrejection", (event) => {
	if (isCancel(event.reason)) {
		event.preventDefault();
	}
});

/**
 * This handles any global errors from Axios... we ignore canceled errors.
 */
axios.interceptors.response.use(undefined, (error) => {
	if (isCancel(error)) {
		return false;
	}
});

/**
 * - useState, the lowest level of state management, and it's typically for primitive values
 * - createContext, basically like a provide/inject kinda pattern, but you should still pass in some sort of state
 * - Redux (RTK) is mostly for global state, where you create a global store
 * - RTK Query for normal data management
 * -- OR Tanstack Query (this gives you API management) + Zustand (this gives you local stores)
 * - Immer for mutations https://immerjs.github.io/immer/example-setstate
 * - useMemo for computed values
 */
createRoot(document.getElementById("app")!).render((
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
));
