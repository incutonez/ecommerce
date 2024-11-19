import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { AddressModel } from "src/db/models/AddressModel";
import { CartItemModel } from "src/db/models/CartItemModel";
import { CategoryModel } from "src/db/models/CategoryModel";
import { ImageModel } from "src/db/models/ImageModel";
import { ProductModel } from "src/db/models/ProductModel";
import { ReviewModel } from "src/db/models/ReviewModel";
import { UserModel } from "src/db/models/UserModel";

export const DBConfig: SequelizeModuleOptions = {
	dialect: "sqlite",
	storage: "src/db/data.db",
	host: "localhost",
	models: [UserModel, AddressModel, ImageModel, CategoryModel, ReviewModel, ProductModel, CartItemModel],
};
