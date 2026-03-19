import { Controller, Get, Module } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { TypeOrmModule } from "@nestjs/typeorm";
import { postgresOrmDataSource } from "./database/config/postgres-orm.config.js";
import { UrlShortenerModule } from "./modules/url-shortener/url-shortener.module.js";

@ApiTags("Saúde")
@Controller()
class AppController {
  @Get("health")
  @ApiOperation({ summary: "Verificar status da API" })
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
