import { UserEntity } from "@incutonez/ecommerce-spec";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { LoadingMask } from "@/components/LoadingMask.tsx";
import { IEventRowClick, ITableColumnProp, TableData } from "@/components/TableData.tsx";
import { useLoadUsers } from "@/hooks/users.ts";
import { RouteViewUser, RouteViewUsers } from "@/routes.ts";
import { UserBirthDate, UserGender } from "@/templates/Users.tsx";

export const Route = createFileRoute(RouteViewUsers)({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
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
		renderer(record) {
			return (
				<UserBirthDate birthDate={record.birthDate} />
			);
		},
	}, {
		title: "Gender",
		field: "gender",
		renderer(record) {
			return (
				<UserGender gender={record.gender} />
			);
		},
	}];

	function onClickRow({ record }: IEventRowClick<UserEntity>) {
		navigate({
			to: RouteViewUser,
			params: {
				userId: record.id!,
			},
		});
	}

	return (
		<>
			<TableData
				columns={columns}
				data={data}
				clickRow={onClickRow}
			/>
			<Outlet />
		</>
	);
}
