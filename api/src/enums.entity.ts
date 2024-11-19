import { ApiProperty } from "@nestjs/swagger";

export const EnumFilterType = {
	Contains: "Contains",
	GreaterThan: "GreaterThan",
	Search: "Search",
} as const;

export type EnumFilterType = keyof typeof EnumFilterType;

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
