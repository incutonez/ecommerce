import { BelongsTo, Column, ForeignKey, HasMany, Table } from "sequelize-typescript";
import { PrimaryKeyGuid } from "src/db/decorators";
import { BaseModel } from "src/db/models/BaseModel";
import { CategoryModel } from "src/db/models/CategoryModel";
import { ImageModel } from "src/db/models/ImageModel";
import { ReviewModel } from "src/db/models/ReviewModel";

@Table({
	tableName: "products",
	timestamps: false,
})
export class ProductModel extends BaseModel {
  @PrimaryKeyGuid()
  declare id: string;

  @Column
  declare name: string;

  @Column
  declare price: number;

  @Column
  declare description: string;

  @ForeignKey(() => CategoryModel)
  @Column
  declare category_id: number;

  @ForeignKey(() => ImageModel)
  @Column
  declare image_id: string;

  @BelongsTo(() => ImageModel, "image_id")
  image: ImageModel;

  @BelongsTo(() => CategoryModel, "category_id")
  category: CategoryModel;

  @HasMany(() => ReviewModel, "product_id")
  reviews: ReviewModel[];
}
