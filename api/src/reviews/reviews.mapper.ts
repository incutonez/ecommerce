import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { ReviewModel } from "src/db/models/ReviewModel";
import { ReviewEntity, ReviewUserEntity } from "src/models/review.entity";
import { UsersMapper } from "src/users/users.mapper";

export function calculateRating(reviews: ReviewModel[]) {
	let total = 0;
	let count = 0;
	reviews.forEach((review) => {
		count++;
		total += review.rating;
	});
	/**
	 * @quirk https://stackoverflow.com/a/11832950/1253609
	 * (* 500) because it's really 5 * 100... we want the ultimate value to be multiplied by 5 because it's a 5-star rating
	 */
	return Math.round((total / (count * 5) + Number.EPSILON) * 500) / 100;
}

@Injectable()
export class ReviewsMapper implements OnModuleInit {
	private usersMapper: UsersMapper;

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
		this.usersMapper = this.moduleRef.get(UsersMapper, {
			strict: false,
		});
	}

	modelToViewModel({ id, title, description, rating, created_date, created_by_user }: ReviewModel): ReviewEntity {
		return {
			id,
			title,
			description,
			rating,
			createdDate: created_date,
			createdBy: created_by_user ? this.usersMapper.userToViewModel(created_by_user) : undefined,
		};
	}

	modelForUserViewModel({ id, title, description, rating, created_date, product, product_id }: ReviewModel): ReviewUserEntity {
		return {
			id,
			title,
			description,
			rating,
			createdDate: created_date,
			productId: product_id,
			productName: product.name,
		};
	}
}
