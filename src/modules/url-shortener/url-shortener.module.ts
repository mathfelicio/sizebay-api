import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShortUrlBuilder } from "./application/builders/short-url.builder.js";
import { CreateShortUrlUseCase } from "./application/use-cases/create-short-url.use-case.js";
import { GetShortUrlUseCase } from "./application/use-cases/get-short-url.use-case.js";
import { SHORT_URL_REPOSITORY } from "./domain/repositories/short-url.repository.js";
import { ShortUrlMongoEntity } from "./infrastructure/entities/short-url.mongoEntity.js";
import { ShortUrlMongoRepository } from "./infrastructure/repositories/short-url-mongo.repository.js";
import { ShortUrlsController } from "./presentation/http/short-urls.controller.js";

@Module({
  imports: [TypeOrmModule.forFeature([ShortUrlMongoEntity], "mongodb")],
  controllers: [ShortUrlsController],
  providers: [
    ShortUrlBuilder,
    CreateShortUrlUseCase,
    GetShortUrlUseCase,
    ShortUrlMongoRepository,
    {
      provide: SHORT_URL_REPOSITORY,
      useClass: ShortUrlMongoRepository,
    },
  ],
  exports: [SHORT_URL_REPOSITORY, ShortUrlMongoRepository],
})
export class UrlShortenerModule {}
