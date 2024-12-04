import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { AddressModel, IAddressModel } from "src/db/models/AddressModel";
import { IUserModel, UserModel } from "src/db/models/UserModel";
import { AddressEntity } from "src/models/address.entity";
import { UserEntity } from "src/models/user.entity";
import { ReviewsMapper } from "src/reviews/reviews.mapper";

@Injectable()
export class UsersMapper implements OnModuleInit {
	private reviewsMapper: ReviewsMapper;

	constructor(private readonly moduleRef: ModuleRef) {
	}

	/**
	 * Because UsersModule depends on ReviewsModule and ReviewsModule depends on UsersModule, we have to do a dynamic
	 * dependency injection because it's a circular dep.  In order to do this, we have to leverage their ModuleRef class
	 * and use forwardRef when defining the import in each module.
	 * Source: https://docs.nestjs.com/fundamentals/circular-dependency#module-forward-reference
	 * Source: https://docs.nestjs.com/fundamentals/module-ref
	 */
	onModuleInit() {
		this.reviewsMapper = this.moduleRef.get(ReviewsMapper, {
			strict: false,
		});
	}

	userToViewModel(model: UserModel): UserEntity {
		// We have to convert to a plain object because otherwise, the data is nested
		if (model instanceof UserModel) {
			model = model.getPlain();
		}
		return {
			id: model.id,
			firstName: model.first_name,
			lastName: model.last_name,
			email: model.email,
			phone: model.phone,
			birthDate: model.birth_date,
			gender: model.gender,
			address: model.address ? this.addressToViewModel(model.address) : undefined,
			reviews: model.reviews ? model.reviews.map((review) => this.reviewsMapper.modelForUserViewModel(review)) : undefined,
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
