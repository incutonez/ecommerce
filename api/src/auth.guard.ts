import {
	CanActivate,
	ExecutionContext,
	Injectable, SetMetadata,
	UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { ProfileEntity } from "src/models/profile.entity";

declare module "express" {
	export interface Request {
		user?: ProfileEntity;
	}
}

export const IgnoreAuthKey = "ignoreAuth";
export function IgnoreAuth() {
	return SetMetadata(IgnoreAuthKey, true);
}

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwtService: JwtService, private reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const ignoreAuth = this.reflector.getAllAndOverride<boolean>(IgnoreAuthKey, [
			context.getHandler(),
			context.getClass(),
		]);
		if (ignoreAuth) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) {
			throw new UnauthorizedException();
		}
		try {
		// 💡 We're assigning the payload to the request object here
		// so that we can access it in our route handlers
			request.user = await this.jwtService.verifyAsync(
				token,
				{
					secret: process.env.JWT_SECRET,
				},
			);
		}
		catch {
			throw new UnauthorizedException();
		}
		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(": ") ?? [];
		return type === "Bearer" ? token : undefined;
	}
}
