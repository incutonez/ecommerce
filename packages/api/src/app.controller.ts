import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AppService } from "src/app.service";
import { VersionEntity } from "src/models/version.entity";

@ApiTags("app")
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get("version")
	getVersion(): VersionEntity {
		return {
			version: process.env.npm_package_version as string,
		};
	}
}
