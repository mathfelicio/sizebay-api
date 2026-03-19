import { Controller, Get, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { postgresOrmDataSource } from "./database/config/postgres-orm.config.js";
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
    TypeOrmModule.forRoot(postgresOrmDataSource.options),
    UrlShortenerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
