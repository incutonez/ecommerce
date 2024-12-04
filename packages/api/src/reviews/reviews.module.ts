import { forwardRef, Module } from "@nestjs/common";
import { ProductsModule } from "src/products/products.module";
import { ReviewsController } from "src/reviews/reviews.controller";
import { ReviewsMapper } from "src/reviews/reviews.mapper";
import { ReviewsService } from "src/reviews/reviews.service";
import { UsersModule } from "src/users/users.module";

@Module({
	imports: [forwardRef(() => UsersModule), forwardRef(() => ProductsModule)],
	controllers: [ReviewsController],
	providers: [ReviewsService, ReviewsMapper],
	exports: [ReviewsMapper],
})
export class ReviewsModule {
}
