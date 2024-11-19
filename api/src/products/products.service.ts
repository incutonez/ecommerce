import { Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize";
import { FindAndCountOptions } from "sequelize/types/model";
import { ProductModel } from "src/db/models/ProductModel";
import { whereSearch } from "src/db/query";
import { EnumFilterType } from "src/enums.entity";
import { ApiPaginatedRequest } from "src/models/base.list.entity";
import { ProductsMapper } from "src/products/products.mapper";
import { sleep } from "src/utils";

@Injectable()
export class ProductsService {
	constructor(private mapper: ProductsMapper) {	}

	async getProducts({ page = 1, limit = 20, filters = [] }: ApiPaginatedRequest) {
		await sleep(2000);
		const query: FindAndCountOptions<ProductModel> = {
			limit,
			offset: (page - 1) * limit,
			/**
			 * @patch https://github.com/sequelize/sequelize/issues/9481
			 * We have to use distinct here, otherwise, it'd count the associations, which gives us an erroneous total count
			 */
			distinct: true,
			include: [
				{
					all: true,
					nested: true,
				},
			],
		};
		filters.forEach(({ type, value }) => {
			if (type === EnumFilterType.Search) {
				query.where = whereSearch<ProductModel>(["name", "price", "description"], value);
			}
		});
		const { rows, count } = await ProductModel.findAndCountAll(query);
		return {
			data: rows.map((item) => this.mapper.modelToListViewModel(item.get({
				plain: true,
			}))),
			total: count,
		};
	}

	async getFeaturedProducts(visibleAmount = 1) {
		const products = await ProductModel.findAll({
			order: Sequelize.literal("random()"),
			limit: 5 * visibleAmount,
			include: [
				{
					all: true,
					nested: true,
				},
			],
		});
		return products.map((product) => this.mapper.modelToListViewModel(product.get({
			plain: true,
		})));
	}

	async getProduct(productId: string) {
		const product = await ProductModel.findByPk(productId, {
			include: [
				{
					all: true,
					nested: true,
				},
			],
		});
		// We don't use raw: true above because it strips out nested associations
		return this.mapper.modelToViewModel(product.get({
			plain: true,
		}));
	}
}
