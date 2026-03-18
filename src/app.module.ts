import { Controller, Get, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { mongoOrmConfig } from "./database/config/mongo-orm.config.js";
import { UrlShortenerModule } from "./modules/url-shortener/url-shortener.module.js";

@Controller()
class AppController {
  @Get("health")
  health() {
    return { status: "ok" };
  }
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...mongoOrmConfig,
      name: "mongodb",
    }),
    UrlShortenerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
