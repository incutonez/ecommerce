import { Column, Table } from "sequelize-typescript";
import { PrimaryKeyGuid } from "src/db/decorators";
import { BaseModel } from "src/db/models/BaseModel";
import { ModelInterface } from "src/types";

export type IAddressModel = ModelInterface<AddressModel>;

@Table({
	tableName: "addresses",
	timestamps: false,
})
export class AddressModel extends BaseModel {
	@PrimaryKeyGuid()
	declare id: string;

	@Column
	declare line_one: string;

	@Column
	declare line_two: string;

	@Column
	declare city: string;

	@Column
	declare state: string;

	@Column
	declare zip_code: string;
}
