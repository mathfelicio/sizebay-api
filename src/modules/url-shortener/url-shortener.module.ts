import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShortUrlBuilder } from "./application/builders/short-url.builder.js";
import { CreateShortUrlUseCase } from "./application/use-cases/create-short-url.use-case.js";
import { GetShortUrlUseCase } from "./application/use-cases/get-short-url.use-case.js";
import { SHORT_URL_REPOSITORY } from "./domain/repositories/short-url.repository.js";
import { ShortUrlEntity } from "./infrastructure/entities/short-url.entity.js";
import { ShortUrlPostgresRepository } from "./infrastructure/repositories/short-url-postgres.repository.js";
import { ShortUrlsController } from "./presentation/http/short-urls.controller.js";

@Module({
  imports: [TypeOrmModule.forFeature([ShortUrlEntity])],
  controllers: [ShortUrlsController],
  providers: [
    ShortUrlBuilder,
    CreateShortUrlUseCase,
    GetShortUrlUseCase,
    ShortUrlPostgresRepository,
    {
      provide: SHORT_URL_REPOSITORY,
      useClass: ShortUrlPostgresRepository,
    },
  ],
  exports: [SHORT_URL_REPOSITORY, ShortUrlPostgresRepository],
})
export class UrlShortenerModule {}
