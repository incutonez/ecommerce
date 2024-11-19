import { Module } from "@nestjs/common";
import { CategoriesModule } from "src/categories/categories.module";
import { ImagesModule } from "src/images/images.module";
import { ProductsController } from "src/products/products.controller";
import { ProductsMapper } from "src/products/products.mapper";
import { ProductsService } from "src/products/products.service";
import { ReviewsModule } from "src/reviews/reviews.module";

@Module({
	controllers: [ProductsController],
	providers: [ProductsService, ProductsMapper],
	imports: [ReviewsModule, ImagesModule, CategoriesModule],
	exports: [ProductsMapper],
})
export class ProductsModule {
}
