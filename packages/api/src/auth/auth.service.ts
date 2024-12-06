import { faker } from "@faker-js/faker";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Sequelize } from "sequelize";
import { AddressModel } from "src/db/models/AddressModel";
import { UserEntity } from "src/models/user.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwtService: JwtService) {
	}

	async signIn(username: string, pass: string) {
		// Obviously this would be checking against some sort of hashed DB entry, but this is a dummy example
		if (pass !== "1337") {
			throw new UnauthorizedException();
		}
		let user: UserEntity;
		try {
			user = await this.usersService.getUserByEmail(username);
		}
		catch (ex) {
			console.log(ex);
			const sex = faker.person.sexType();
			const address = await AddressModel.findOne({
				order: Sequelize.literal("random()"),
			});
			user = await this.usersService.createUser({
				firstName: faker.person.firstName(sex),
				lastName: faker.person.lastName(),
				email: username,
				phone: faker.phone.number(),
				birthDate: faker.date.birthdate().getTime(),
				gender: sex,
				address: {
					id: address.id,
				},
			});
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
