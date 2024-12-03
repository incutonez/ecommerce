import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios, { isCancel } from "axios";
import { App } from "@/App.tsx";

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
		<App />
	</StrictMode>
));
