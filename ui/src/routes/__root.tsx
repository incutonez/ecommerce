import { useEffect } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { LoadingMask } from "@/components/LoadingMask.tsx";
import { UserStore, useUserStore } from "@/stores/User.ts";
import { NavigationMain } from "@/templates/NavigationMain.tsx";

export const Route = createRootRoute({
	component: RouteComponent,
});

function RouteComponent() {
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
	return (
		<App />
	);
}

function App() {
	return (
		<>
			<NavigationMain />
			<main className="relative flex size-full flex-col overflow-hidden">
				<Outlet />
			</main>
		</>
	);
}
