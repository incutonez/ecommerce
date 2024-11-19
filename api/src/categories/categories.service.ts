import { Injectable } from "@nestjs/common";
import { CategoriesMapper } from "src/categories/categories.mapper";
import { CategoryModel } from "src/db/models/CategoryModel";
import { CategoryResponseModel } from "src/models/responses.entity";

@Injectable()
export class CategoriesService {
	constructor(private mapper: CategoriesMapper) {
	}

	async getCategories(): Promise<CategoryResponseModel> {
		const { rows, count } = await CategoryModel.findAndCountAll({
			order: [["name", "ASC"]],
		});
		return {
			data: rows.map((category) => this.mapper.modelToViewModel(category)),
			total: count,
		};
	}
}
