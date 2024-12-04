import { DataTypes } from "sequelize";
import { Column } from "sequelize-typescript";
import { uuid } from "uuidv4";

export function PrimaryKeyGuid() {
	return Column({
		type: DataTypes.UUID,
		defaultValue: () => uuid(),
		primaryKey: true,
		allowNull: false,
	});
}

export function DateEpoch() {
	return Column({
		type: DataTypes.NUMBER,
		defaultValue: () => Date.now(),
		allowNull: false,
	});
}
