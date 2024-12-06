import { Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize";
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

	async listUsers({ page, limit = 20, filters = [], sorters = [] }: ApiPaginatedRequest) {
		const query: FindAndCountOptions<UserModel> = {
			limit,
			offset: (page - 1) * limit,
			order: sorters.map(({ field, direction }) => {
				field = field.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
				if (field === "birth_date") {
					return [field, direction];
				}
				return [Sequelize.fn("lower", Sequelize.col(field)), direction];
			}),
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

	async getUserByEmail(email: string) {
		const response = await UserModel.findOne({
			where: {
				email,
			},
			include: [
				{
					all: true,
					nested: true,
				},
			],
		});
		return this.mapper.userToViewModel(response);
	}

	async getUser(userId: string) {
		const response = await UserModel.findOne({
			where: {
				id: userId,
			},
			include: [
				{
					all: true,
					nested: true,
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
