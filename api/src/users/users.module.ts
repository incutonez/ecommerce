import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from "src/db/models/UserModel";
import { UsersController } from "src/users/users.controller";
import { UsersMapper } from "src/users/users.mapper";
import { UsersService } from "src/users/users.service";

@Module({
	imports: [SequelizeModule.forFeature([UserModel])],
	controllers: [UsersController],
	providers: [UsersService, UsersMapper],
	exports: [UsersService, UsersMapper],
})
export class UsersModule {}
