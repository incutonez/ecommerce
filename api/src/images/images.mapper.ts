import { ImageModel } from "src/db/models/ImageModel";
import { ImageEntity } from "src/models/image.entity";

export class ImagesMapper {
	modelToViewModel({ id, created_date, name, content_type }: ImageModel): ImageEntity {
		return {
			id,
			name,
			contentType: content_type,
			createdDate: created_date,
		};
	}
}
