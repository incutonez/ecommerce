import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { IgnoreAuth } from "src/auth.guard";
import { AuthService } from "src/auth/auth.service";
import { AccessTokenEntity, AuthLoginEntity } from "src/models/auth.entity";
import { ProfileEntity } from "src/models/profile.entity";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly service: AuthService) {
	}

	@IgnoreAuth()
	@Post("login")
	async login(@Body() body: AuthLoginEntity): Promise<AccessTokenEntity> {
		return this.service.signIn(body.username, body.password);
	}

	@Get("profile")
	getProfile(@Req() req: Request): ProfileEntity {
		return req.user;
	}
}
