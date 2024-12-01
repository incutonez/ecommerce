import { useState } from "react";
import { UserEntity } from "@incutonez/ecommerce-spec";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { BaseDialog } from "@/components/BaseDialog.tsx";
import { RouteViewUser } from "@/routes.ts";
import { ViewUser } from "@/templates/Users.tsx";

export const Route = createFileRoute(RouteViewUser)({
	component: RouteComponent,
});

export function RouteComponent() {
	const { history } = useRouter();
	const { userId } = Route.useParams();
	const [user, setUser] = useState<UserEntity>();

	function setShow() {
		history.go(-1);
	}

	return (
		<BaseDialog
			show={true}
			setShow={setShow}
			title={`${user?.firstName} ${user?.lastName}`}
		>
			<ViewUser
				userId={userId}
				setUser={setUser}
			/>
		</BaseDialog>
	);
}
