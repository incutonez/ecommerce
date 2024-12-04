import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { CategoriesMapper } from "src/categories/categories.mapper";
import { ProductModel } from "src/db/models/ProductModel";
import { ImagesMapper } from "src/images/images.mapper";
import { ProductEntity, ProductListEntity } from "src/models/product.entity";
import { calculateRating, ReviewsMapper } from "src/reviews/reviews.mapper";

@Injectable()
export class ProductsMapper implements OnModuleInit {
	private reviewsMapper: ReviewsMapper;

	constructor(private readonly moduleRef: ModuleRef, private readonly imagesMapper: ImagesMapper, private readonly categoriesMapper: CategoriesMapper) {
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

	modelToListViewModel({ id, name, price, description, image, category, reviews }: ProductModel): ProductListEntity {
		return {
			id,
			name,
			price,
			description,
			image: image ? this.imagesMapper.modelToViewModel(image) : undefined,
			category: category ? this.categoriesMapper.modelToViewModel(category) : undefined,
			rating: reviews ? calculateRating(reviews) : undefined,
		};
	}

	modelToViewModel({ id, name, price, description, image, category, reviews }: ProductModel): ProductEntity {
		return {
			id,
			name,
			price,
			description,
			image: this.imagesMapper.modelToViewModel(image),
			category: this.categoriesMapper.modelToViewModel(category),
			reviews: reviews.map((review) => this.reviewsMapper.modelToViewModel(review)),
			rating: calculateRating(reviews),
		};
	}
}
