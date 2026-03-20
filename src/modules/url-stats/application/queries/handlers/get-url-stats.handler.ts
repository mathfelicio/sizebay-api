import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { GetUrlStatsQuery } from "../get-url-stats.query.js";
import { GetUrlStatsUseCase } from "../../use-cases/get-url-stats.use-case.js";
import { UrlStatsResult } from "../../types/url-stats-result.type.js";

@QueryHandler(GetUrlStatsQuery)
export class GetUrlStatsQueryHandler implements IQueryHandler<
  GetUrlStatsQuery,
  UrlStatsResult
> {
  constructor(private readonly getUrlStatsUseCase: GetUrlStatsUseCase) {}

  async execute(query: GetUrlStatsQuery): Promise<UrlStatsResult> {
    return this.getUrlStatsUseCase.execute(query.code);
  }
}
