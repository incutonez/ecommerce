import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { AuthModule } from "src/auth/auth.module";
import { CartItemsModule } from "src/cart/cart.items.module";
import { CategoriesModule } from "src/categories/categories.module";
import { DBConfig } from "src/db";
import { HealthModule } from "src/health/health.module";
import { ImagesModule } from "src/images/images.module";
import { ProductsModule } from "src/products/products.module";
import { ReviewsModule } from "src/reviews/reviews.module";
import { UsersModule } from "src/users/users.module";

@Module({
	imports: [
		AuthModule,
		UsersModule,
		ImagesModule,
		ProductsModule,
		CategoriesModule,
		ReviewsModule,
		CartItemsModule,
		HealthModule,
		ConfigModule.forRoot({
			envFilePath: [".env.local", ".env"],
		}),
		SequelizeModule.forRoot(DBConfig),
	],
	controllers: [AppController],
	providers: [AppService, JwtService],
})
export class AppModule {}
