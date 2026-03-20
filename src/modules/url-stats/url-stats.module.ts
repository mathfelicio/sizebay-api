import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { UrlShortenerModule } from "../url-shortener/url-shortener.module.js";
import { GetUrlStatsUseCase } from "./application/use-cases/get-url-stats.use-case.js";
import { ShortUrlAccessedHandler } from "./application/event-handlers/short-url-accessed.handler.js";
import { GetUrlStatsQueryHandler } from "./application/queries/handlers/get-url-stats.handler.js";
import { URL_STATS_REPOSITORY } from "./domain/repositories/url-stats.repository.js";
import { UrlStatsOrmEntity } from "./infrastructure/entities/url-stats-orm.entity.js";
import { UrlStatsPostgresRepository } from "./infrastructure/repositories/url-stats-postgres.repository.js";
import { UrlStatsController } from "./presentation/http/url-stats.controller.js";

@Module({
  imports: [
    TypeOrmModule.forFeature([UrlStatsOrmEntity]),
    UrlShortenerModule,
    CqrsModule,
  ],
  controllers: [UrlStatsController],
  providers: [
    GetUrlStatsUseCase,
    ShortUrlAccessedHandler,
    GetUrlStatsQueryHandler,
    UrlStatsPostgresRepository,
    {
      provide: URL_STATS_REPOSITORY,
      useClass: UrlStatsPostgresRepository,
    },
  ],
  exports: [URL_STATS_REPOSITORY],
})
export class UrlStatsModule {}
