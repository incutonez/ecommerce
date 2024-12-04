import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { ClassInterface } from "src/types";

export enum EnumChangeStatus {
	Unchanged = "Unchanged",
	Created = "Created",
	Updated = "Updated",
	Deleted = "Deleted",
}

export type TTreeItemValue = TreeItemModel | TreeItemModel[] | boolean | number | string | Date | object;
export type TTreeItem = ClassInterface<TreeItemModel>;

export class TreeChangeModel {
	username: string;
	date: number;
	creates: number;
	updates: number;
	deletes: number;
	items: TreeItemModel[];
}

export class TreeItemModel {
	@ApiProperty({
		oneOf: [{
			type: "string",
		}, {
			type: "number",
		}],
	})
	field: number | string;
	@ApiProperty({
		oneOf: [{
			type: "string",
		}, {
			type: "boolean",
		}, {
			type: "number",
		}, {
			$ref: getSchemaPath(TreeItemModel),
		}, {
			type: "array",
			items: {
				$ref: getSchemaPath(TreeItemModel),
			},
		}],
	})
	value: TTreeItemValue;
	previous?: TreeItemModel;
	@ApiProperty({
		enum: EnumChangeStatus,
		enumName: "EnumChangeStatus",
	})
	status?: EnumChangeStatus;
}
