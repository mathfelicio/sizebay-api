import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { GetShortUrlQuery } from "../get-short-url.query.js";
import { GetShortUrlUseCase } from "../../use-cases/get-short-url.use-case.js";
import { ShortUrl } from "../../../domain/entities/short-url.entity.js";

@QueryHandler(GetShortUrlQuery)
export class GetShortUrlQueryHandler implements IQueryHandler<
  GetShortUrlQuery,
  ShortUrl
> {
  constructor(private readonly getShortUrlUseCase: GetShortUrlUseCase) {}

  async execute(query: GetShortUrlQuery): Promise<ShortUrl> {
    return this.getShortUrlUseCase.execute(query.code);
  }
}
