import { Injectable } from "@nestjs/common";
import { ImageModel } from "src/db/models/ImageModel";
import { ImagesMapper } from "src/images/images.mapper";

@Injectable()
export class ImagesService {
	constructor(private mapper: ImagesMapper) {
	}

	async getImage(imageId: string) {
		return ImageModel.findByPk(imageId);
	}
}
