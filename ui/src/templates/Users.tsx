import { ReactNode } from "react";
import { UserEntity } from "@incutonez/ecommerce-spec";
import { isToday } from "date-fns";
import { IconBirthday, IconFaceOne, IconFaceThree, IconFaceTwo, IIcon } from "@/assets/icons.tsx";
import { BaseIcon } from "@/components/BaseIcon.tsx";
import { toBirthDate } from "@/utils.ts";

export function UserGender({ gender }: UserEntity) {
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

export function UserBirthDate({ birthDate }: UserEntity) {
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
