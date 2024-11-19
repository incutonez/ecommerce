import { Injectable } from "@nestjs/common";
import { FindAndCountOptions } from "sequelize/types/model";
import { UserModel } from "src/db/models/UserModel";
import { whereSearch } from "src/db/query";
import { EnumFilterType } from "src/enums.entity";
import { ApiPaginatedRequest } from "src/models/base.list.entity";
import { BulkResponse } from "src/models/responses.entity";
import { UserEntity } from "src/models/user.entity";
import { UsersMapper } from "src/users/users.mapper";

@Injectable()
export class UsersService {
	constructor(private readonly mapper: UsersMapper) {}

	async listUsers({ start = 0, limit = 20, filters = [] }: ApiPaginatedRequest) {
		const query: FindAndCountOptions<UserModel> = {
			limit,
			raw: true,
			offset: start,
			include: [
				{
					all: true,
				},
			],
		};
		filters.forEach(({ type, value }) => {
			if (type === EnumFilterType.Search) {
				query.where = whereSearch<UserModel>(["first_name", "last_name", "phone", "email", "gender", "birth_date"], value);
			}
		});
		const { rows, count } = await UserModel.findAndCountAll(query);
		return {
			data: rows.map((item) => this.mapper.userToViewModel(item)),
			total: count,
		};
	}

	async getUser(userId: string) {
		const response = await UserModel.findOne({
			raw: true,
			where: {
				id: userId,
			},
			include: [
				{
					all: true,
				},
			],
		});
		return this.mapper.userToViewModel(response);
	}

	async createUser(user: UserEntity) {
		const response = await UserModel.create(this.mapper.viewModelToUser(user));
		return this.mapper.userToViewModel(response);
	}

	async createUsers(users: UserEntity[]) {
		const errors: BulkResponse[] = [];
		await Promise.all(users.map(async (user, index) => {
			try {
				await this.createUser(user);
			}
			catch (ex) {
				errors.push({
					index,
					message: ex.errors.map(({ message }) => message),
				});
			}
		}));
		return errors;
	}

	async copyUser(userId: string) {
		const user = await this.getUser(userId);
		delete user.id;
		user.lastName += " Copy";
		return this.createUser(user);
	}

	async updateUser(user: UserEntity) {
		await UserModel.update(this.mapper.viewModelToUser(user), {
			where: {
				id: user.id,
			},
			returning: true,
		});
		return this.getUser(user.id);
	}

	async deleteUser(id: string) {
		await UserModel.destroy({
			where: {
				id,
			},
		});
	}
}
