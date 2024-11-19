import { AddressEntity } from "src/models/address.entity";

export class UserEntity {
	id?: string;
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	birthDate?: number;
	gender?: string;
	address?: AddressEntity;
}
