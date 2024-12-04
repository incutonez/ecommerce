import { PartialType } from "@nestjs/swagger";

export class AddressEntity {
	id?: string;
	lineOne: string;
	lineTwo?: string;
	city: string;
	state: string;
	zipCode: string;
}

export class UserAddressEntity extends PartialType(AddressEntity) {}
