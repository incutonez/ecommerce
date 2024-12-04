import { ComponentProps, ElementType } from "react";
import { UserAddressEntity, UserEntity } from "@incutonez/ecommerce-spec";
import { IBaseDialog } from "@/components/BaseDialog.tsx";

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
	showGender?: boolean;
}

export interface IUserBirthDate {
	birthDate: number | undefined;
}

export interface IUserAddress {
	address?: UserAddressEntity;
}

export interface IUserDetails {
	record: UserEntity;
}

export interface IUserDialog extends IBaseDialog {
	userId: string;
}

export interface IUserAvatar {
	random?: boolean;
	name?: string;
	icon?: ElementType;
	userId?: string;
	gender?: string;
}
