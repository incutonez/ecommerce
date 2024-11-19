import { BelongsTo, Column, ForeignKey, Table } from "sequelize-typescript";
import { PrimaryKeyGuid } from "src/db/decorators";
import { AddressModel } from "src/db/models/AddressModel";
import { BaseModel } from "src/db/models/BaseModel";
import { ModelInterface } from "src/types";

export type IUserModel = ModelInterface<UserModel>;

@Table({
	tableName: "users",
	timestamps: false,
})
export class UserModel extends BaseModel {
	@PrimaryKeyGuid()
	declare id: string;

	@Column
	declare first_name: string;

	@Column
	declare last_name: string;

	@Column
	declare phone: string;

	@Column
	declare email: string;

	@Column
	declare gender: string;

	@Column
	declare birth_date: number;

	@ForeignKey(() => AddressModel)
	@Column
	declare address_id?: number;

	@BelongsTo(() => AddressModel)
	address?: AddressModel;
}
