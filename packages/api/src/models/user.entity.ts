import { UserAddressEntity } from "src/models/address.entity";
import { ReviewUserEntity } from "src/models/review.entity";

export class UserEntity {
	id?: string;
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	birthDate?: number;
	gender?: string;
	address?: UserAddressEntity;
	reviews?: ReviewUserEntity[];
}
