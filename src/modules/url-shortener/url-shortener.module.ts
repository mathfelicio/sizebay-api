import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { ShortUrlBuilder } from "./application/builders/short-url.builder.js";
import { CreateShortUrlUseCase } from "./application/use-cases/create-short-url.use-case.js";
import { GetShortUrlUseCase } from "./application/use-cases/get-short-url.use-case.js";
import { UpdateShortUrlUseCase } from "./application/use-cases/update-short-url.use-case.js";
import { DeleteShortUrlUseCase } from "./application/use-cases/delete-short-url.use-case.js";
import { SHORT_URL_REPOSITORY } from "./domain/repositories/short-url.repository.js";
import { ShortUrlOrmEntity } from "./infrastructure/entities/short-url-orm.entity";
import { ShortUrlPostgresRepository } from "./infrastructure/repositories/short-url-postgres.repository.js";
import { ShortUrlsController } from "./presentation/http/short-urls.controller.js";
import { CreateShortUrlCommandHandler } from "./application/commands/handlers/create-short-url.handler.js";
import { UpdateShortUrlCommandHandler } from "./application/commands/handlers/update-short-url.handler.js";
import { DeleteShortUrlCommandHandler } from "./application/commands/handlers/delete-short-url.handler.js";
import { GetShortUrlQueryHandler } from "./application/queries/handlers/get-short-url.handler.js";

@Module({
  imports: [TypeOrmModule.forFeature([ShortUrlOrmEntity]), CqrsModule],
  controllers: [ShortUrlsController],
  providers: [
    ShortUrlBuilder,
    CreateShortUrlUseCase,
    GetShortUrlUseCase,
    UpdateShortUrlUseCase,
    DeleteShortUrlUseCase,
    ShortUrlPostgresRepository,
    CreateShortUrlCommandHandler,
    UpdateShortUrlCommandHandler,
    DeleteShortUrlCommandHandler,
    GetShortUrlQueryHandler,
    {
      provide: SHORT_URL_REPOSITORY,
      useClass: ShortUrlPostgresRepository,
    },
  ],
  exports: [SHORT_URL_REPOSITORY, ShortUrlPostgresRepository, TypeOrmModule],
})
export class UrlShortenerModule {}
