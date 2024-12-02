import { createFileRoute, useRouter } from "@tanstack/react-router";
import { RouteViewUser } from "@/routes.ts";
import { UserDialog } from "@/templates/Users.tsx";

export const Route = createFileRoute(RouteViewUser)({
	component: RouteComponent,
});

export function RouteComponent() {
	const { history } = useRouter();
	const { userId } = Route.useParams();

	function setShow() {
		history.go(-1);
	}

	return (
		<UserDialog
			show={true}
			setShow={setShow}
			userId={userId}
		/>
	);
}
