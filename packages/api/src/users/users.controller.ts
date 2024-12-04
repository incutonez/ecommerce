import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApiPaginatedRequest } from "src/models/base.list.entity";
import { UserResponseModel } from "src/models/responses.entity";
import { UserEntity } from "src/models/user.entity";
import { UsersService } from "src/users/users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
	constructor(private readonly service: UsersService) {}

	@Post("list")
	@HttpCode(HttpStatus.OK)
	async listUsers(@Body() body: ApiPaginatedRequest): Promise<UserResponseModel> {
		return this.service.listUsers(body);
	}

	@Get(":userId")
	async getUser(@Param("userId") userId: string) {
		return this.service.getUser(userId);
	}

	@Post()
	async createUser(@Body() body: UserEntity) {
		return this.service.createUser(body);
	}

	@Post("bulk")
	@ApiBody({
		type: [UserEntity],
	})
	async createUsers(@Body() body: UserEntity[]) {
		return this.service.createUsers(body);
	}

	@Post(":userId/copy")
	async copyUser(@Param("userId") userId: string) {
		return this.service.copyUser(userId);
	}

	@Put(":userId")
	async updateUser(@Param("userId") userId: string, @Body() body: UserEntity) {
		return this.service.updateUser(body);
	}

	@Delete(":userId")
	@HttpCode(HttpStatus.NO_CONTENT)
	async deleteUser(@Param("userId") userId: string) {
		return this.service.deleteUser(userId);
	}
}
