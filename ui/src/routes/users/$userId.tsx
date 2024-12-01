import { createFileRoute } from "@tanstack/react-router";
import { RouteViewUser } from "@/routes.ts";

export const Route = createFileRoute(RouteViewUser)({
	component: RouteComponent,
});

function RouteComponent() {
	return "Hello /users/$userId!";
}
