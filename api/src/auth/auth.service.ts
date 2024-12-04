import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwtService: JwtService) {
	}

	async signIn(username: string, pass: string) {
		const user = await this.usersService.getUser(username);
		// Obviously this would be checking against some sort of hashed DB entry
		if (pass !== "test") {
			throw new UnauthorizedException();
		}
		return {
			accessToken: await this.jwtService.signAsync({
				sub: user.id,
				family_name: user.lastName,
				given_name: user.firstName,
				email: user.email,
			}, {
				secret: process.env.JWT_SECRET,
			}),
		};
	}
}
