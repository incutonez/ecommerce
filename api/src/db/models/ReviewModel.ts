import { BelongsTo, Column, ForeignKey, Table } from "sequelize-typescript";
import { PrimaryKeyGuid } from "src/db/decorators";
import { BaseModel } from "src/db/models/BaseModel";
import { ProductModel } from "src/db/models/ProductModel";
import { UserModel } from "src/db/models/UserModel";

@Table({
	tableName: "reviews",
	timestamps: false,
})
export class ReviewModel extends BaseModel {
  @PrimaryKeyGuid()
  declare id: string;

  @Column
  declare title: string;

  @Column
  declare description: string;

  @Column
  declare rating: number;

  @Column
  declare created_date: number;

  @ForeignKey(() => UserModel)
  @Column
  declare created_by: string;

  @ForeignKey(() => ProductModel)
  @Column
  declare product_id: string;

  @BelongsTo(() => UserModel, "created_by")
  created_by_user: UserModel;
}
