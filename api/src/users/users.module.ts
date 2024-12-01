import { forwardRef, Module } from "@nestjs/common";
import { ReviewsModule } from "src/reviews/reviews.module";
import { UsersController } from "src/users/users.controller";
import { UsersMapper } from "src/users/users.mapper";
import { UsersService } from "src/users/users.service";

@Module({
	imports: [forwardRef(() => ReviewsModule)],
	controllers: [UsersController],
	providers: [UsersService, UsersMapper],
	exports: [UsersService, UsersMapper],
})
export class UsersModule {}
