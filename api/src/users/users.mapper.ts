import { AddressModel, IAddressModel } from "src/db/models/AddressModel";
import { IUserModel, UserModel } from "src/db/models/UserModel";
import { AddressEntity } from "src/models/address.entity";
import { UserEntity } from "src/models/user.entity";

export class UsersMapper {
	userToViewModel(user: UserModel): UserEntity {
		return {
			id: user.id,
			firstName: user.first_name,
			lastName: user.last_name,
			email: user.email,
			phone: user.phone,
			birthDate: user.birth_date,
			gender: user.gender,
			address: user.address ? this.addressToViewModel(user.address) : undefined,
		};
	}

	viewModelToUser({ id, firstName, lastName, email, phone, birthDate, gender, address }: UserEntity): IUserModel {
		return {
			id: id ?? undefined,
			email,
			phone,
			gender,
			first_name: firstName,
			last_name: lastName,
			birth_date: birthDate,
			address_id: address?.id,
		};
	}

	addressToViewModel({ line_one, line_two, city, state, zip_code, id }: AddressModel): AddressEntity {
		return {
			id,
			lineOne: line_one,
			lineTwo: line_two,
			city,
			state,
			zipCode: zip_code,
		};
	}

	viewModelToAddress({ id, lineOne, lineTwo, city, state, zipCode }: AddressEntity): IAddressModel {
		return {
			id,
			city,
			state,
			line_one: lineOne,
			line_two: lineTwo,
			zip_code: zipCode,
		};
	}
}
