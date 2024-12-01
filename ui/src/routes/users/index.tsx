import { UserEntity } from "@incutonez/ecommerce-spec";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { LoadingMask } from "@/components/LoadingMask.tsx";
import { ITableColumnProp, TableData } from "@/components/TableData.tsx";
import { useLoadUsers } from "@/hooks/users.ts";
import { RouteViewUsers } from "@/routes.ts";
import { UserBirthDate, UserGender } from "@/templates/Users.tsx";

export const Route = createFileRoute(RouteViewUsers)({
	component: RouteComponent,
});

// TODOJEF: PICK UP HERE... WIRE UP TO API
function RouteComponent() {
	const { isFetching, data = [] } = useQuery(useLoadUsers());
	if (isFetching) {
		return <LoadingMask />;
	}
	const columns: ITableColumnProp<UserEntity>[] = [{
		title: "First Name",
		field: "firstName",
	}, {
		title: "Last Name",
		field: "lastName",
	}, {
		title: "Email",
		field: "email",
	}, {
		title: "Phone",
		field: "phone",
	}, {
		title: "Birth Date",
		field: "birthDate",
		renderer: UserBirthDate,
	}, {
		title: "Gender",
		field: "gender",
		renderer: UserGender,
	}];
	return (
		<TableData
			columns={columns}
			data={data}
		/>
	);
}
