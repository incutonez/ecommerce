import { CategoryEntity } from "src/models/category.entity";
import { ImageEntity } from "src/models/image.entity";
import { ReviewEntity } from "src/models/review.entity";

export class ProductEntity {
  id?: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  category: CategoryEntity;
  image: ImageEntity;
  reviews: ReviewEntity[];
}

export class ProductListEntity {
  id?: string;
  name: string;
  price: number;
  description: string;
  category: CategoryEntity;
  image: ImageEntity;
  rating: number;
}
