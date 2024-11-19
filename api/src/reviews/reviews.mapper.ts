import { Injectable } from "@nestjs/common";
import { ReviewModel } from "src/db/models/ReviewModel";
import { ReviewEntity } from "src/models/review.entity";
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
export class ReviewsMapper {
	constructor(private readonly usersMapper: UsersMapper) {
	}

	modelToViewModel({ id, title, description, rating, created_date, created_by_user }: ReviewModel): ReviewEntity {
		return {
			id,
			title,
			description,
			rating,
			createdDate: created_date,
			createdBy: this.usersMapper.userToViewModel(created_by_user),
		};
	}
}
