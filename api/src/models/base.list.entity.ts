import { ApiProperty } from "@nestjs/swagger";
import { FilterType } from "src/enums.entity";

interface IResponseListEntity<T> {
	data: T[];
	total?: number;
}

export class ApiPaginatedRequest {
	start: number;
	limit: number;
	page: number;
	filters?: FilterType[];
}

export function GetResponseModel<T>(ResourceClass) {
	class ResponseListEntity implements IResponseListEntity<T> {
		@ApiProperty({
			type: [ResourceClass],
		})
		data: T[];
		total?: number;
	}
	return ResponseListEntity;
}
