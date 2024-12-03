import { createRootRoute, Outlet } from "@tanstack/react-router";
import { NavigationMain } from "@/templates/NavigationMain.tsx";

export const Route = createRootRoute({
	component: App,
});

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
