import { Module } from "@nestjs/common";
import { CategoriesController } from "src/categories/categories.controller";
import { CategoriesMapper } from "src/categories/categories.mapper";
import { CategoriesService } from "src/categories/categories.service";

@Module({
	controllers: [CategoriesController],
	providers: [CategoriesService, CategoriesMapper],
	exports: [CategoriesMapper],
})
export class CategoriesModule {
}
