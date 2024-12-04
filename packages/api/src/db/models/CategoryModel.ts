import { Column, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "src/db/models/BaseModel";

@Table({
	tableName: "categories",
	timestamps: false,
})
export class CategoryModel extends BaseModel {
  @Column
  declare name: string;

  @ForeignKey(() => CategoryModel)
  @Column
  declare parent_id: number;
}
