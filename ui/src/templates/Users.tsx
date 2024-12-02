import { ReactNode, useEffect, useState } from "react";
import { UserEntity } from "@incutonez/ecommerce-spec";
import { useQuery } from "@tanstack/react-query";
import { isToday } from "date-fns";
import { IconBirthday, IconFaceOne, IconFaceThree, IconFaceTwo, IIcon } from "@/assets/icons.tsx";
import { BaseDialog, IBaseDialog } from "@/components/BaseDialog.tsx";
import { BaseIcon } from "@/components/BaseIcon.tsx";
import { FieldDisplay } from "@/components/FieldDisplay.tsx";
import { LoadingMask } from "@/components/LoadingMask.tsx";
import { useLoadUser } from "@/hooks/users.ts";
import { ProductReviewNodes } from "@/routes/products/$productId.tsx";
import { NotFound } from "@/templates/NotFound.tsx";
import {
	IUserAddress, IUserAvatar,
	IUserBirthDate,
	IUserDetails,
	IUserDialog,
	IUserGender,
	IViewUser,
} from "@/types/Users.ts";
import { emptyFn, toBirthDate } from "@/utils.ts";

export function UserGender({ gender, showGender = true }: IUserGender) {
	let icon: IIcon | undefined;
	let genderNode: ReactNode;

	if (gender === "male") {
		icon = IconFaceOne;
	}
	else if (gender === "female") {
		icon = IconFaceThree;
	}
	else {
		icon = IconFaceTwo;
	}

	if (showGender) {
		genderNode = (
			<span>
				{gender}
			</span>
		);
	}

	return (
		<div className="flex space-x-1">
			{icon && <BaseIcon as={icon} />}
			{genderNode}
		</div>
	);
}

export function UserBirthDate({ birthDate }: IUserBirthDate) {
	let icon: ReactNode | undefined;
	// Check to see if their birthday is today
	if (birthDate) {
		const date = new Date(birthDate);
		date.setFullYear(new Date().getFullYear());
		if (isToday(date)) {
			icon = (
				<BaseIcon
					className="fill-sky-600"
					as={IconBirthday}
				/>
			);
		}
	}
	return (
		<div className="flex items-center space-x-1">
			<span>
				{toBirthDate(birthDate)}
			</span>
			{icon}
		</div>
	);
}

export function UserAddress({ address }: IUserAddress) {
	if (!address) {
		return;
	}
	const { lineOne, lineTwo, city, state, zipCode } = address;
	const lineTwoNode = lineTwo
		? (
			<span>
				{lineTwo}
			</span>
		)
		: undefined;
	return (
		<article className="flex flex-col space-y-4">
			<FieldDisplay label="Address">
				<span>
					{lineOne}
				</span>
				{lineTwoNode}
			</FieldDisplay>
			<section className="flex space-x-4">
				<FieldDisplay
					label="City"
					value={city}
				/>
				<FieldDisplay
					label="State"
					value={state}
				/>
				<FieldDisplay
					label="Zip"
					value={zipCode}
				/>
			</section>
		</article>
	);
}

export function UserDetails({ record }: IUserDetails) {
	return (
		<article className="flex min-w-48 flex-col gap-6">
			<section className="flex gap-6">
				<FieldDisplay
					label="First Name"
					value={record.firstName}
				/>
				<FieldDisplay
					label="Last Name"
					value={record.lastName}
				/>
			</section>
			<section className="flex gap-6">
				<FieldDisplay label="Gender">
					<UserGender gender={record.gender} />
				</FieldDisplay>
				<FieldDisplay label="Birth Date">
					<UserBirthDate birthDate={record.birthDate} />
				</FieldDisplay>
			</section>
			<FieldDisplay
				label="Email"
				value={record.email}
			/>
			<FieldDisplay
				label="Phone"
				value={record.phone}
			/>
		</article>
	);
}

export function ViewUser({ userId, setUser = emptyFn }: IViewUser) {
	const { isFetching, data } = useQuery(useLoadUser(userId));
	useEffect(() => {
		if (data) {
			setUser(data);
		}
	}, [data, setUser]);
	if (isFetching) {
		return <LoadingMask />;
	}
	if (!data) {
		return <NotFound />;
	}
	return (
		<article className="flex h-full space-x-8">
			<UserDetails record={data} />
			<UserAddress address={data.address} />
			<section className="flex flex-col space-y-2 overflow-auto text-sm">
				<ProductReviewNodes reviews={data.reviews} />
			</section>
		</article>
	);
}

export function UserDialog({ setShow, show, userId }: IUserDialog) {
	const [user, setUser] = useState<UserEntity>();
	if (show === undefined) {
		return;
	}

	return (
		<BaseDialog
			show={show}
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

export function UserAvatar({ name, userId, gender }: IUserAvatar) {
	const [showUser, setShowUser] = useState<IBaseDialog["show"]>(undefined);
	let nameNode: ReactNode;

	function onClickUser() {
		setShowUser(true);
	}

	if (name) {
		nameNode = (
			<span className="font-bold">
				{name}
			</span>
		);
	}

	if (userId) {
		nameNode = (
			<>
				<span
					className="cursor-pointer hover:text-sky-800"
					onClick={onClickUser}
				>
					{nameNode}
				</span>
				<UserDialog
					show={showUser}
					setShow={setShowUser}
					userId={userId}
				/>
			</>
		);
	}
	return (
		<article className="flex items-center space-x-2">
			<section className="flex size-9 items-center justify-center rounded-full bg-gray-200">
				<UserGender
					gender={gender}
					showGender={false}
				/>
			</section>
			{nameNode}
		</article>
	);
}
