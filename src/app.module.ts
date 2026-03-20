import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { postgresOrmDataSource } from "./database/config/postgres-orm.config.js";
import { UrlShortenerModule } from "./modules/url-shortener/url-shortener.module.js";
import { UrlStatsModule } from "./modules/url-stats/url-stats.module.js";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...postgresOrmDataSource.options,
      autoLoadEntities: true,
    }),
    UrlShortenerModule,
    UrlStatsModule,
  ],
})
export class AppModule { }
