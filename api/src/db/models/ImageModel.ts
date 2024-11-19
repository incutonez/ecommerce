import { Column, DataType, Table } from "sequelize-typescript";
import { PrimaryKeyGuid } from "src/db/decorators";
import { BaseModel } from "src/db/models/BaseModel";

@Table({
	tableName: "images",
	timestamps: false,
})
export class ImageModel extends BaseModel {
  @PrimaryKeyGuid()
  declare id: string;

  @Column
  declare name: string;

  @Column({
  	type: DataType.BLOB,
  })
  declare contents: Blob;

  @Column
  declare created_date: number;

  @Column
  declare content_type: string;
}
