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
	declare id: number;

	@Column
	line_one: string;

	@Column
	line_two: string;

	@Column
	city: string;

	@Column
	state: string;

	@Column
	zip_code: string;
}
