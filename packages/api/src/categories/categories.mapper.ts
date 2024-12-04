import { CategoryModel } from "src/db/models/CategoryModel";
import { CategoryEntity } from "src/models/category.entity";

export class CategoriesMapper {
	modelToViewModel({ id, name, parent_id }: CategoryModel): CategoryEntity {
		return {
			id,
			name: name[0].toUpperCase() + name.slice(1),
			parentId: parent_id,
		};
	}
}
