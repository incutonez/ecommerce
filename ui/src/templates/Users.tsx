import { ComponentProps, ReactNode, useEffect } from "react";
import { AddressEntity, UserEntity } from "@incutonez/ecommerce-spec";
import { useQuery } from "@tanstack/react-query";
import { isToday } from "date-fns";
import { IconBirthday, IconFaceOne, IconFaceThree, IconFaceTwo, IIcon } from "@/assets/icons.tsx";
import { BaseIcon } from "@/components/BaseIcon.tsx";
import { FieldDisplay } from "@/components/FieldDisplay.tsx";
import { LoadingMask } from "@/components/LoadingMask.tsx";
import { useLoadUser } from "@/hooks/users.ts";
import { ProductReviewNodes } from "@/routes/products/$productId.tsx";
import { NotFound } from "@/templates/NotFound.tsx";
import { emptyFn, toBirthDate } from "@/utils.ts";

export interface IViewUser extends ComponentProps<"article"> {
	userId: string;
	/**
	 * Because we want to load the user in the View, it's possible we're wrapping it in a BaseDialog, so we want to
	 * communicate back to the parent the loaded value, so we can use it in the title or something
	 */
	setUser?: (user: UserEntity) => void;
}

export interface IUserGender {
	gender: string | undefined;
}

export interface IUserBirthDate {
	birthDate: number | undefined;
}

export interface IUserAddress {
	address?: AddressEntity;
}

export interface IUserDetails {
	record: UserEntity;
}

export function UserGender({ gender }: IUserGender) {
	let icon: IIcon | undefined;
	if (gender === "male") {
		icon = IconFaceOne;
	}
	else if (gender === "female") {
		icon = IconFaceThree;
	}
	else if (gender) {
		icon = IconFaceTwo;
	}
	return (
		<div className="flex space-x-1">
			{icon && <BaseIcon as={icon} />}
			<span>
				{gender}
			</span>
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
			icon = <BaseIcon as={IconBirthday} />;
		}
	}
	return (
		<div className="flex space-x-1">
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

// TODOJEF: Maybe make this a floating route, where it can be overlayed over any route?
// TODOJEF: PICK UP HERE... WIRE UP REST OF SEARCH USERS API... need pagination and such
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
