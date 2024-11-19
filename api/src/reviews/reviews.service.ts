import { Injectable } from "@nestjs/common";
import { ReviewsMapper } from "src/reviews/reviews.mapper";

@Injectable()
export class ReviewsService {
	constructor(private mapper: ReviewsMapper) {
	}
}
