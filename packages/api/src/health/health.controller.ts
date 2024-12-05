import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IgnoreAuth } from "src/auth.guard";

@IgnoreAuth()
@ApiTags("health")
@Controller("health")
export class HealthController {
	constructor() {
	}

  @Get()
	async getVitals() {
		return "Have a great day!  :)";
	}
}
