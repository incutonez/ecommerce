import { Controller, Get, Param, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { IgnoreAuth } from "src/auth.guard";
import { ImagesService } from "src/images/images.service";

@ApiTags("images")
@Controller("images")
export class ImagesController {
	constructor(private readonly service: ImagesService) {
	}

	@IgnoreAuth()
	@Get(":imageId")
	async getImage(@Param("imageId") imageId: string, @Res() res: Response) {
		const response = await this.service.getImage(imageId);
		res.set("Content-Type", response.content_type);
		res.send(response.contents);
	}
}
