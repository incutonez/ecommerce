import { Injectable } from "@nestjs/common";
import { CategoriesMapper } from "src/categories/categories.mapper";
import { ProductModel } from "src/db/models/ProductModel";
import { ImagesMapper } from "src/images/images.mapper";
import { ProductEntity, ProductListEntity } from "src/models/product.entity";
import { calculateRating, ReviewsMapper } from "src/reviews/reviews.mapper";

@Injectable()
export class ProductsMapper {
	constructor(private readonly imagesMapper: ImagesMapper, private readonly categoriesMapper: CategoriesMapper, private readonly reviewsMapper: ReviewsMapper) {
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
