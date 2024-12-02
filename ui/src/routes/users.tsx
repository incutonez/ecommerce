import { UserEntity } from "@incutonez/ecommerce-spec";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { TableData } from "@/components/TableData.tsx";
import { usePaginatedApi } from "@/hooks/api.ts";
import { useLoadUsers } from "@/hooks/users.ts";
import { RouteViewUser, RouteViewUsers } from "@/routes.ts";
import { UserBirthDate, UserGender } from "@/templates/Users.tsx";
import { IEventRowClick, ITableColumnProp } from "@/types/TableData.ts";

export const Route = createFileRoute(RouteViewUsers)({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const paginatedApi = usePaginatedApi();
	const { isFetching, data = [] } = useQuery(useLoadUsers(paginatedApi));
	const columns: ITableColumnProp<UserEntity>[] = [{
		title: "First Name",
		field: "firstName",
	}, {
		title: "Last Name",
		field: "lastName",
	}, {
		title: "Email",
		field: "email",
		truncate: true,
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
				className="size-full"
				columns={columns}
				data={data}
				paginatedApi={paginatedApi}
				loading={isFetching}
				clickRow={onClickRow}
			/>
			<Outlet />
		</>
	);
}
