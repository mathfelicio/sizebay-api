import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { QueryBus } from "@nestjs/cqrs";
import { GetUrlStatsQuery } from "../../application/queries/get-url-stats.query.js";
import { UrlStatsPresenter } from "./presenters/url-stats.presenter.js";
import { UrlStatsResult } from "../../application/types/url-stats-result.type.js";

@ApiTags("Estatísticas de URLs")
@Controller("shorten")
export class UrlStatsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(":code/stats")
  @ApiOperation({
    summary: "Obtém as estatísticas de acesso de uma URL encurtada",
  })
  @ApiResponse({
    status: 200,
    description: "Retorna as estatísticas da URL encurtada",
    type: UrlStatsPresenter,
  })
  @ApiResponse({ status: 404, description: "URL encurtada não encontrada" })
  async getStats(@Param("code") code: string) {
    const stats = await this.queryBus.execute<GetUrlStatsQuery, UrlStatsResult>(
      new GetUrlStatsQuery(code),
    );
    return UrlStatsPresenter.toHttp(stats);
  }
}
