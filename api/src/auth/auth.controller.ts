import { Controller, Get, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { IgnoreAuth } from "src/auth.guard";
import { AuthService } from "src/auth/auth.service";
import { AccessTokenEntity } from "src/models/access.token.entity";
import { ProfileEntity } from "src/models/profile.entity";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly service: AuthService) {
	}

	@IgnoreAuth()
	@Get("access-token")
	async getAccessToken(): Promise<AccessTokenEntity> {
		return this.service.signIn("56598d60-1523-4c0d-b5f4-6fad590e69a7", "test");
	}

	@Get("profile")
	getProfile(@Req() req: Request): ProfileEntity {
		return req.user;
	}
}
