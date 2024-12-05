import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import compression from "compression";
import { writeFileSync } from "fs";
import * as path from "path";
import { AppModule } from "src/app.module";

function buildSwagger(app: INestApplication) {
	const config = new DocumentBuilder().setTitle("API").setDescription("The main API for all Sandbox apps").setVersion("1.0").addTag("users").addTag("accounts").addTag("Differ").addTag("Random").build();
	const document = SwaggerModule.createDocument(app, config, {
		operationIdFactory: (_: string, methodKey: string) => methodKey,
	});
	SwaggerModule.setup("api", app, document);
	const outputPath = path.resolve(process.cwd(), "../spec/swagger.json");
	// Taken from https://stackoverflow.com/a/64935977/1253609
	writeFileSync(outputPath, JSON.stringify(document), {
		encoding: "utf8",
	});
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.use(compression());
	if (process.env.NODE_ENV === "development") {
		buildSwagger(app);
	}
	await app.listen(3000);
}
bootstrap();
