import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ReviewsService } from "src/reviews/reviews.service";

@ApiTags("reviews")
@Controller("reviews")
export class ReviewsController {
	constructor(private readonly service: ReviewsService) {
	}
}
