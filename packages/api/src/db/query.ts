import { Op } from "sequelize";
import { WhereAttributeHash, WhereOptions } from "sequelize/types/model";

export function whereLike(field: string, value: number | string | boolean | Date): WhereAttributeHash {
	return {
		[field]: {
			[Op.like]: `%${value}%`,
		},
	};
}

export function whereSearch<TAttributes>(fields: (keyof TAttributes)[], value: number | boolean | string): WhereOptions<TAttributes> {
	return {
		[Op.or]: fields.map((field) => whereLike(field as string, value)),
	};
}
