import { BelongsTo, Column, ForeignKey, HasMany, Table } from "sequelize-typescript";
import { PrimaryKeyGuid } from "src/db/decorators";
import { AddressModel } from "src/db/models/AddressModel";
import { BaseModel } from "src/db/models/BaseModel";
import { ReviewModel } from "src/db/models/ReviewModel";
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
	declare address_id?: string;

	@BelongsTo(() => AddressModel, "address_id")
	address?: AddressModel;

	@HasMany(() => ReviewModel, "created_by")
	reviews?: ReviewModel[];
}
