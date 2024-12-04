import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "src/auth.guard";
import { AuthController } from "src/auth/auth.controller";
import { AuthService } from "src/auth/auth.service";
import { UsersModule } from "src/users/users.module";

@Module({
	imports: [UsersModule, JwtModule.register({
		global: true,
		secret: process.env.JWT_SECRET,
		signOptions: {
			expiresIn: "1d",
		},
	})],
	controllers: [AuthController],
	providers: [AuthService, {
		provide: APP_GUARD,
		useClass: AuthGuard,
	}],
})
export class AuthModule {}
