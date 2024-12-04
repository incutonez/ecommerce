import { Module } from "@nestjs/common";
import { ImagesController } from "src/images/images.controller";
import { ImagesMapper } from "src/images/images.mapper";
import { ImagesService } from "src/images/images.service";

@Module({
	controllers: [ImagesController],
	providers: [ImagesService, ImagesMapper],
	exports: [ImagesMapper],
})
export class ImagesModule {
}
