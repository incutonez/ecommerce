import { ApiProperty } from "@nestjs/swagger";

export const EnumSortType = {
	Ascending: "asc",
	Descending: "desc",
} as const;

export type EnumSortType = (typeof EnumSortType)[keyof typeof EnumSortType];

export const EnumFilterType = {
	Contains: "Contains",
	GreaterThan: "GreaterThan",
	Search: "Search",
} as const;

export type EnumFilterType = keyof typeof EnumFilterType;

export class SortType {
	@ApiProperty({
		enum: Object.values(EnumSortType),
		enumName: "EnumSortType",
		required: true,
	})
	direction: EnumSortType;
	field: string;
}

export class FilterType {
	@ApiProperty({
		required: true,
		oneOf: [
			{
				type: "string",
			},
			{
				type: "number",
			},
			{
				type: "boolean",
			},
		],
	})
	value: string | number | boolean;
	@ApiProperty({
		enum: Object.keys(EnumFilterType),
		enumName: "EnumFilterType",
		required: true,
	})
	type?: EnumFilterType;
	field?: string;
}
